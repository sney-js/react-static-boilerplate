import React from "react";
import { ITextCardFields } from "../../../contentful/@types/contentful";
import RichText from "../../elements/rich-text/RichText";
import TextCardConnected, { TextCard } from "../../components/text-card/TextCard";

export default ({ item, ...rest }) => {
    if (!item) return null;

    const {
        header,
        caption,
        headerAlignment,
        content,
        doNotApplyCardStyles,
        forLoggedIn,
    } = item.fields as ITextCardFields;

    const transformedData: TextCard["props"] = {
        header: RichText({ html: header }),
        caption,
        headerAlignment,
        doNotApplyCardStyles,
        content: RichText({ html: content }),
        forLoggedIn,
    };

    return <TextCardConnected {...rest} {...transformedData}  />;
};
