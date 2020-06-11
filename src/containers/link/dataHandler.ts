import { resolveLinkInfo } from "utils/Resolver";

export const linkHandler = link => {
    Object.assign(link, resolveLinkInfo(link));
    delete link.fields;
    delete link.sys;
    return link;
};

export default linkHandler;
