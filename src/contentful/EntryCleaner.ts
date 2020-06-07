import { getContentType, getPageType } from "../app/utils/Resolver";
import { useSiteData } from "react-static";
import { WINDOW } from "../app/utils/helpers";
import RouteConfig from "./RouteConfig";

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
    const type = getContentType(object);
    if (type) {
        if (Array.isArray(object)) {
            return object.filter(element =>
                cleanupEntryLink(element),
            );
        }
    }
    return object;
}

export function cleanupData(data, locale?:string, withHandler?: boolean) {
    const config = RouteConfig.cleanupConfig;

    const stack = [];
    const processed = [];
    let localContentData = Object.assign({}, data);
    stack.push(localContentData);

    while (stack.length > 0) {
        const item = stack.pop();
        if (processed.indexOf(item) != -1) continue;
        processed.push(item);

        //--------------------------------------------------
        const contentType = getContentType(item);

        // embeds contentType inside item as sys is removed from data in frontend
        if (contentType) {
            item.type = contentType;
        }

        // embeds locale inside item info to be used by resolve methods on frontend
        if (getPageType(contentType) && locale) {
            item.locale = locale;
            if (typeof item.sys === "object") {
                item.sys.locale = locale;
            }
        }

        for (const prop in item) {
            // for each key in item. (e.g, [sys, fields, title, name]

            if (item.hasOwnProperty(prop) && !config.ignoreProps.includes(prop)) {
                // if is a valid key

                if (prop == null || prop === "locale") continue;

                if (typeof item[prop] == "object") {
                    // if is a bigger object (e.g. [fields, link]

                    item[prop] = cleanupEntryLink(item[prop]);

                    let overwriteField = item[prop].overwrite;
                    if (overwriteField) {
                        item[overwriteField] = item[prop].value;
                    }

                    if (typeof item[prop] == "object") stack.push(item[prop]);
                }
            }
        }

        if (withHandler && contentType && !config.ignoreTypes.includes(contentType)) {
            handleContent(item, config.handlers);
        }
    }

    if (!withHandler) {
        cleanupData(localContentData, locale, true);
    }

    // finally clean bigger objected like link
    Object.assign(data, localContentData);
}

export const getSiteDataForKey = function(key: string, locale: string) {
    const { siteData, localeData } = useSiteData();
    return localeData.hasMultipleLocales ? siteData[locale][key] : siteData[key];
};

export const GTM_HTML = `
    <script>
        // TODO GTM Analytics 
        const gtmID = "null";
        const cookieKeyForGMT = "consent_a"
          window.getCookie = function(name) {
            var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
            if (match) return match[2];
        };
    
        function initTracking(w, d, s, l, i) {
            w[l] = w[l] || [];
            // w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
            var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : "";
            j.async = true;
            j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
            f.parentNode.insertBefore(j, f);
        }
    
        const consentCookie = window.getCookie(cookieKeyForGMT);
        if (consentCookie && consentCookie === "true") {
            initTracking(window, document, "script", "dataLayer", gtmID);
            console.log("Cookie Allowed");
        } else {
            console.log("Cookie not Allowed");
        }    
    </script>
`;

/**
 * To be used with GTM. Usage:
 * trackEvent({event: "cta_click"});
 * trackEvent({event: "pageview"}); //pageview needs to be set up differently on gtm
 * @param rest
 */
export function trackEvent({ ...rest }) {
    if (!WINDOW.dataLayer) {
        return;
    }
    // assuming GTM scripts exist in public/index.html
    WINDOW.dataLayer.push({
        // locale: "en",
        ...rest,
    });
}

const insertScriptBlock = (scriptString: string, document) => {
    const script = document.createElement("script");
    script.innerHTML = scriptString;
    script.async = true;
    document.body.appendChild(script);
};
