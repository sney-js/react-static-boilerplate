import { resolveLinkInfo } from "../../utils/Resolver";

export const linkHandler = link => {
    Object.assign(link.fields, resolveLinkInfo(link));
    delete link.fields.internalLink;
    delete link.fields.externalLink;
    delete link.sys;
    return link;
};

export default linkHandler;
