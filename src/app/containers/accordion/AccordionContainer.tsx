import link from "../link/link";
import React from "react";
import { IAccordionFields, IAccordionItemFields } from "../../../contentful/@types/contentful";
import RichText from "../../elements/rich-text/RichText";
import { Accordion } from "../../components/accordion/Accordion";

// Add all new contentful containers here.
export default ({ item, ...rest }) => {
    if (!item) return null;

    const { id, caption, title, items } = item.fields as IAccordionFields;

    const transformedData: Accordion["props"] = {
        id,
        caption,
        title: RichText({ html: title }),
        items: items.map(item => {
            const { title, content, links } = item.fields as IAccordionItemFields;
            return {
                title,
                content: RichText({ html: content }),
                links: links && links.map(item => link({ item: item })),
            };
        }),
    };

    return <Accordion {...rest} {...transformedData} animateIn />;
};
