import React from "react";
import RichText from "../../elements/rich-text/RichText";
import { RespImage } from "../../utils/RespImage";
import Container from "../../components/container/Container";

// Add all new contentful containers here.
export const renderContentContainer = ({ item, ...rest }) => {
    console.log(item);
    switch (item.type) {
        case "rich-text":
            return (
                <Container padded maxWidth>
                    <RichText markdown={item.fields.text} />;
                </Container>
            );
        case "image":
            return <Container maxWidth><RespImage image={item.fields.image} /></Container>;
        default:
            return null;
    }
};
