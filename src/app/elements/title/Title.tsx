import * as React from "react";
import { ReactNode } from "react";
import "./title.scss";
import { makeClass } from "../../utils/helpers";
import Container from "../../components/container/Container";

type ImageProps = {
    caption?: string;
    content?: ReactNode;
    alignment?: "left" | "right" | "center";
} & React.HTMLAttributes<HTMLElement>;

const Title = (props: ImageProps) => {
    const className = makeClass(["d-title", props.alignment && "align-" + props.alignment]);
    return (
        <Container className={className}>
            {props.caption && <div className="caption">{props.caption}</div>}
            {props.content}
        </Container>
    );
};

export default Title;
