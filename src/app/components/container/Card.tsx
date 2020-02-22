import React from "react";
import Container from "./Container";
import LinkElement from "../../elements/link/LinkElement";
// const styles = require("./card.module.scss");
import "./card.scss";

type CardProps = {
    image: React.ReactElement;
    title: string;
    href?: string;
    subTitle?: string;
    subTitleHref?: string;
    description?: React.ReactElement;
};
export const Card = (props: CardProps) => (
    <Container background={"Primary"} className={"card"}>
        <div>
            <LinkElement path={props.href}>{props.image}</LinkElement>
        </div>
        <div className={"content"}>
            <LinkElement path={props.subTitleHref}>
                <h4 className={"caption"}>{props.subTitle}</h4>
            </LinkElement>
            <LinkElement path={props.href}>
                <h3>{props.title}</h3>
            </LinkElement>
            <p>{props.description}</p>
        </div>
    </Container>
);
