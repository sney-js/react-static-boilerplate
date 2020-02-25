import { getContentType, resolve } from "../utils/Resolver";
import linkHandler from "./link/dataHandler";
import { ContentfulApi } from "../../contentful/api";
import { useSiteData } from "react-static";

export function handleContent(contentItem, handlers) {
    const handler = handlers[getContentType(contentItem)];
    if (handler) {
        handler(contentItem);
        return;
    }
    defaultHandler(contentItem);
}

export function defaultHandler(node) {
    delete node.sys;
    return node;
}

export type CleanupConfig = {
    handlers: Object;
    ignoreProps: Array<string>;
    ignoreTypes: Array<string>;
};

function cleanupEntryLink(object) {
    if (Array.isArray(object)) {
        return object.filter(element => cleanupEntryLink(element));
    }

    if (object && object.sys && object.sys.type === "Link") {
        return null;
    }

    return object;
}

export function cleanupData(data, config: CleanupConfig) {
    const stack = [];
    const processed = [];
    stack.push(data);

    while (stack.length > 0) {
        const object = stack.pop();
        if (processed.indexOf(object) != -1) continue;
        processed.push(object);
        const contentType = getContentType(object);
        if (contentType) {
            object.type = contentType;
        }
        if (object?.sys?.locale) {
            object.locale = object.sys.locale;
        }

        for (const prop in object) {
            if (object.hasOwnProperty(prop) && !config.ignoreProps.includes(prop)) {
                if (prop == null) continue;
                if (config.ignoreTypes.includes(contentType)) continue;
                if (typeof object[prop] == "object") {
                    object[prop] = cleanupEntryLink(object[prop]);
                    if (object[prop]) stack.push(object[prop]);
                }
            }
        }
        if (contentType && !config.ignoreTypes.includes(contentType)) {
            handleContent(object, config.handlers);
        }
    }
}

export async function routeDataResolver(client: ContentfulApi, pageList = ["page"]) {
    const handlers = {
        link: linkHandler,
    };

    const cleanupConfig: CleanupConfig = {
        handlers: handlers,
        ignoreProps: ["sys"],
        ignoreTypes: [],
    };

    const defaultLocale = await client.getLocale();
    const locales = await client.getLocales();

    return Promise.all(
        locales.map(lang => {
            client.setLocale(lang);
            return Promise.all(
                pageList.map(contentName =>
                    client.getPages(contentName).then(query => ({
                        type: contentName,
                        items: query.items.map(page => {
                            cleanupData(page, cleanupConfig);
                            return {
                                page,
                                name: page?.fields?.name,
                                path: resolve(page, defaultLocale),
                                locale: lang,
                            };
                        }),
                    })),
                ),
            ).then(val=>{
                console.log(val);
                return val;
            });
        }),
    );
}


export const getSiteDataForKey = function(key: string, locale: string) {
    const { siteData, localeData } = useSiteData();
    return localeData.hasMultipleLocales ? siteData[locale][key] : siteData[key];
};
