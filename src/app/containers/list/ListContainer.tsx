import link from "../link/link";
import React from "react";
import { IListFields } from "../../../contentful/@types/contentful";
import { List } from "../../components/list/List";
import RichText from "../../elements/rich-text/RichText";
import Container from "../../components/container/Container";

// Add all new contentful containers here.
export default ({ item, ...rest }) => {
    if (!item) return null;

    const { caption, title, items } = item.fields as IListFields;

    const transformedData: List["props"] = {
        caption,
        title: RichText({ html: title }),
        items: items.map(item => link({ item: item })),
    };

    return <List {...rest} {...transformedData} animateIn />;
};
