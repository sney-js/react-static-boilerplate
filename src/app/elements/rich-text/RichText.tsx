import React from "react";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ImageElement from "../image/Image";
import LinkElement from "../link/LinkElement";
import "./rich-text.scss";

const GLOBAL_OPTIONS = {
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: node => {
            return <ImageElement content={node.data.target} />;
        },
        [INLINES.ENTRY_HYPERLINK]: node => {
            return (
                <LinkElement {...node.data.target.fields}>
                    {node.content[0] && node.content[0].value}
                </LinkElement>
            );
        },
    },
};

export default ({ html }) => {
    if (!html) return null;
    const data = documentToReactComponents(html, GLOBAL_OPTIONS) as Array<any>;
    if(data.length && !data[data.length -1].props.children[0] ) {
        data.pop();
    }
    return (
        <section className={"bpl-rich-text"}>
            {data}
        </section>
    );
};
