import { getContentType, resolve } from "../utils/Resolver";
import linkHandler from "./link/dataHandler";

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

export async function routeDataResolver(client) {
    const handlers = {
        link: linkHandler,
    };

    const cleanupConfig: CleanupConfig = {
        handlers: handlers,
        ignoreProps: ["sys"],
        ignoreTypes: [],
    };

    const [{ items: pages }, locale] = await Promise.all([client.getPages(), client.getLocale()]);

    const routes = pages.map(page => {
        cleanupData(page, cleanupConfig);
        const path = resolve(page);
        return {
            page,
            path,
            locale: locale.code,
        };
    });
    return routes;
}

export function toDashCase(str) {
    if (!str) return null;
    return str.replace(/\s+/g, "-").toLowerCase();
}
