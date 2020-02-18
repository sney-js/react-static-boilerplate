import React from "react";
import TextCard from "../textCard/textCard";
import Form from "../form/form";
import WrapperComponent from "../wrapperComponent/wrapperComponent";

// Add all new contentful containers here.
export const renderContentContainer = ({ item, ...rest }) => {
    switch (item.type) {
        case "textCard":
            return TextCard({ item: item, ...rest });
        case "wrapperComponent":
            return WrapperComponent({ item: item, ...rest });
        case "login":
            return <Form key={rest.key} item={item} {...rest} />;
        default:
            return null;
    }
};
