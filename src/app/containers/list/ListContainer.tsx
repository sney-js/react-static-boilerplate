import React from "react";
import Container from "../../components/container/Container";
import { IArticleFields, IListFields } from "../../../contentful/@types/contentful";
import { getContentType } from "../../utils/Resolver";
import { RespImage } from "../../utils/RespImage";
import RichText from "../../elements/rich-text/RichText";
type ListTypes = {
    item: IListFields;
};
export default function ListContainer(props: ListTypes) {
    const { item } = props;
    if (!item) return null;
    return (
        <Container animateIn pad={"All"} layoutType={"maxWidth"}>
            <h2>{item.name}</h2>
            <Container
                layoutType={"grid"}
                gridColumn={"1fr 1fr 1fr"}
                gridColumnTablet={"1fr 1fr"}
                gridColumnMobile={"1fr"}
            >
                {item.consys.map(articles => {
                    const type = getContentType(articles);
                    switch (type) {
                        case "article": {
                            const fields = articles.fields as IArticleFields;
                            return (
                                <Container background={"Primary"}>
                                    <RespImage image={fields.image} />
                                    <h3>{fields.title}</h3>
                                    <RichText document={fields.description} />
                                </Container>
                            );
                        }
                        default:
                            return null;
                    }
                })}
            </Container>
        </Container>
    );
}
