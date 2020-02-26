import { environment } from "../environments/environment";

export const resolve = (node, defaultLocale?: String) => {
    if (!node) return undefined;
    let contentType = getContentType(node);
    switch (contentType) {
        case "page":
            return getPagePath(node, {
                parentPageFieldName: "parentPage",
                defaultLocale: defaultLocale,
            });
        case "article":
            return getPagePath(node, {
                parentPageFieldName: "category",
                defaultLocale: defaultLocale,
            });
        case "category":
            return getPagePath(node, { defaultLocale: defaultLocale });
        default:
            return undefined;
    }
};

export const resolveLinkInfo = node => {
    if (node && node.fields.path) return;
    let internalLinkNode;
    const contentType = getContentType(node);
    if (contentType === "article" || contentType === "page") {
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
    };
    if (internalLinkNode) {
        linkData.path = resolve(internalLinkNode) + ((anchorId && "#" + anchorId) || "");
    } else if (externalLinkNode || anchorId) {
        linkData.path = (externalLinkNode || "") + ((anchorId && "#" + anchorId) || "");
    }
    return linkData;
};

export const resolveAssetLink = node => {
    try {
        return node.fields.file.url;
    } catch (e) {
        return undefined;
    }
};

type ResolveOptions = {
    parentPageFieldName?: String;
    defaultLocale?: String;
};

export const cleanPath = function(result: string) {
    return (result + "/").toString().replace(/[\/]+/g, "/");
};

const getPagePath = (
    page,
    { parentPageFieldName = "parentPage", defaultLocale }: ResolveOptions,
) => {
    const pages = [];
    const stack = [];
    stack.push(page);

    while (stack.length > 0) {
        let node = stack.pop();
        let name = node.fields.name === "index" ? "" : node.fields.name;

        pages.push(name);

        if (node.fields[parentPageFieldName?.toString()]) {
            stack.push(node.fields[parentPageFieldName.toString()]);
        }
    }

    const locale = page.locale || page.sys.locale;
    // DEFAULT_LOCALE is not undefined during build. From frontend, defaultLocale is essential
    if (locale && locale !== (environment.defaultLocale || defaultLocale)) {
        pages.push(locale);
    }

    let result = "/" + pages.reverse().join("/");
    result = cleanPath(result);

    return result;
};

export const getContentType = node => {
    try {
        return node.type || node.sys.contentType.sys.id;
    } catch (e) {
        return undefined;
    }
};
