import React from "react";
import LinkElement from "../../elements/link/LinkElement";
import { getAssociatedIcon } from "../helpers";

// Add all new contentful containers here.
export default params => {
    const { item, index, ...rest } = params;
    if (!item) return null;

    const { path, title, newTab, isExternal, associatedIcon } = item.fields;

    const transformedData: LinkElement["props"] = {
        path,
        title,
        newTab,
        isExternal,
        associatedIcon: associatedIcon ? React.createElement(getAssociatedIcon(associatedIcon)) : null,
    };

    return (
        <LinkElement {...rest} {...transformedData} key={index}>
            {rest.children}
        </LinkElement>
    );
};
