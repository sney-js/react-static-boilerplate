import React from "react";
import WrapperComponent from "../wrapperComponent/wrapperComponent";

// Add all new contentful containers here.
export const renderContentContainer = ({ item, ...rest }) => {
    switch (item.type) {
        case "wrapperComponent":
            return WrapperComponent({ item: item, ...rest });
        default:
            return null;
    }
};
