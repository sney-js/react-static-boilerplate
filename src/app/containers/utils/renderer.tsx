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
                <Container padded maxWidth animateIn>
                    <RichText document={item.fields.content} />
                </Container>
            );
        case "image":
            return (
                <Container maxWidth animateIn>
                    <RespImage image={item.fields.image} />
                </Container>
            );
        default:
            return null;
    }
};
