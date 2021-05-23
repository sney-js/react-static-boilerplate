import React from "react";
import LinkElement from "../../elements/link/LinkElement";
import { LinkData } from "../../models/LinkData";

// Add all new contentful containers here.
type LinkWrapType = {
    children?: any;
} & LinkData;

const LinkWrap = (params: LinkWrapType) => {
    if (!params) return null;

    return <LinkElement {...params}>{params.children || params.title}</LinkElement>;
};
export default LinkWrap;
