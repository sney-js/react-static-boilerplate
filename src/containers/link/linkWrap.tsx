import React from "react";
import LinkElement from "elements/Link";
import { LinkData } from "models/LinkData";

type LinkWrapType = {
    children?: any;
} & LinkData;

function LinkWrap(params: LinkWrapType) {
    if (!params) return null;
    return <LinkElement to={"/"}>{params.children || params.title}</LinkElement>;

}

export default LinkWrap;
