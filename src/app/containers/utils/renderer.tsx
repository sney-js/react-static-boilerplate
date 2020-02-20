import React from "react";
import RichText from "../../elements/rich-text/RichText";
import { RespImage } from "../../utils/RespImage";
import Container from "../../components/container/Container";
import ListContainer from "../list/ListContainer";

// Add all new contentful containers here.
export const renderContentContainer = ({ item, ...rest }) => {
    console.log(item);
    switch (item.type) {
        case "rich-text":
            return (
                <Container pad={"All"} layoutType={"maxWidth"} animateIn>
                    <RichText document={item.fields.content} />
                </Container>
            );
        case "image":
            return (
                <Container layoutType={"maxWidth"} animateIn>
                    <RespImage image={item.fields.image} />
                </Container>
            );
        case "list":
            return (
                <ListContainer item={item.fields} />
            );
        default:
            return null;
    }
};
