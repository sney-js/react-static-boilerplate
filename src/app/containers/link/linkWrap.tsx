import React from "react";
import LinkElement from "../../elements/link/LinkElement";
import { LinkData } from "../../models/LinkData";

export default LinkWrap;
// Add all new contentful containers here.
type LinkWrapType = {
    children?: any;
} & LinkData;

function LinkWrap(params: LinkWrapType) {
    if (!params) return null;

    return <LinkElement {...params}>{params.children || params.title}</LinkElement>;
}
