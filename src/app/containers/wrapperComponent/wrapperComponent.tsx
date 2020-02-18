import React from "react";
import Container from "../../components/container/Container";
import { renderContentContainer } from "../utils/renderer";
import { IWrapperComponentFields } from "../../../contentful/@types/contentful";

export default ({ item, ...rest }) => {
    if (!item) return null;

    const { backgroundStyle, backgroundPosition } = item.fields as IWrapperComponentFields;

    const transformedData: Container["props"] = {
        background: backgroundStyle && backgroundStyle.toLowerCase(),
    };

    return (
        <Container {...transformedData} {...rest}>
            {item.fields.content &&
            item.fields.content.map((item, index) =>
                renderContentContainer({ item, key: index }),
            )}
        </Container>
    );
};
