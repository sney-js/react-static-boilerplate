import React from "react";
import RichText from "../../elements/rich-text/RichText";
import { RespImage } from "../../utils/RespImage";
import Container from "../../components/container/Container";
import ListContainer from "../list/ListContainer";

// Add all new contentful containers here.
export const renderContentContainer = ({ item, key, ...rest }) => {
    switch (item.type) {
        case "rich-text":
            return (
                <Container key={key} pad={"All"} layoutType={"maxWidth"} animateIn>
                    <RichText document={item.fields.content} />
                </Container>
            );
        case "image":
            return (
                <Container key={key} layoutType={"maxWidth"} animateIn>
                    <RespImage image={item.fields.image} />
                </Container>
            );
        case "list":
            return <ListContainer key={key} item={item.fields} />;
        default:
            return null;
    }
};
