import { LinkData } from "../models/LinkData";
import RouteConfig from "../../contentful/RouteConfig";
import { Asset, Sys } from "contentful";

export type ContentfulEntry = {
    sys: Sys;
    fields: any;
    type?: string;
    locale?: string;
};

/**
 * Returns the resolved path from a given ContentfulNode
 * @param node
 */
export const resolve = (node: ContentfulEntry) => {
    if (!node) return undefined;

    let contentType = getContentType(node);
    let pageContentTypeConfig = RouteConfig.pages.find(e => e.contentType === contentType);

    if (!pageContentTypeConfig) {
        return undefined;
    }

    return _resolvePagePath(node, pageContentTypeConfig.parentField);
};

/**
 * Given ILink or a contentType defined in RouteConfig, determines its LinkData
 * @param node
 */
export const resolveLinkInfo = (node: ContentfulEntry): LinkData => {
    if (node && node.fields.path) return;

    let internalLinkNode;

    const contentType = getContentType(node);
    // pages can be directly resolved too
    if (RouteConfig.pages.find(e => e.contentType === contentType)) {
        internalLinkNode = node;
    } else {
        internalLinkNode = node.fields.internalLink;
    }

    let externalLinkNode = node.fields.externalLink;
    let anchorId = node.fields.anchorId;

    const linkData = {
        title: node.fields.title,
        newTab: node.fields.isNewTab,
        path: "",
        isExternal: !!externalLinkNode || (!internalLinkNode && !!anchorId),
        associatedIcon: node.fields.associatedIcon,
    } as LinkData;

    if (internalLinkNode) {
        linkData.path = resolve(internalLinkNode) + ((anchorId && "#" + anchorId) || "");
    } else if (externalLinkNode || anchorId) {
        linkData.path = (externalLinkNode || "") + ((anchorId && "#" + anchorId) || "");
    }
    return linkData;
};

export const resolveAssetLink = (node: Asset) => {
    return node?.fields?.file?.url;
};

export const cleanPath = function(result: string) {
    return (result + "/").toString().replace(/[\/]+/g, "/");
};

export const getContentType = (node?: ContentfulEntry) => {
    try {
        return node.type || node.sys.contentType.sys.id;
    } catch (e) {
        return undefined;
    }
};

const _resolvePagePath = (page: ContentfulEntry, parentPageFieldName?: string) => {
    const pages = [];
    const stack = [];
    stack.push(page);

    while (stack.length > 0) {
        let node = stack.pop();
        let name = node.fields.name === "index" ? "" : node.fields.name;

        pages.push(name);

        if (parentPageFieldName && node.fields[parentPageFieldName.toString()]) {
            stack.push(node.fields[parentPageFieldName.toString()]);
        }
    }

    const locale = page?.sys?.locale;
    // DEFAULT_LOCALE is not undefined during build. From frontend, defaultLocale is essential
    if (locale && locale !== RouteConfig.defaultLocale) {
        pages.push(locale);
    }

    let result = "/" + pages.reverse().join("/");
    result = cleanPath(result);

    return result;
};
