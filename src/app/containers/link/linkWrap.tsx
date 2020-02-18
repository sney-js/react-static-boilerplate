import React from "react";
import LinkElement from "../../elements/link/LinkElement";
import { LinkData } from "../../models/LinkData";

export default LinkWrap;
// Add all new contentful containers here.
function LinkWrap(params: LinkData) {
    if (!params) return null;

    return (
        <LinkElement {...params}>
            {params.title}
        </LinkElement>
    );
}
