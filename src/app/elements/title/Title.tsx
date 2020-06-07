import * as React from "react";
import "./title.scss";
import { ReactNode } from "react";
import { makeClass } from "../../utils/helpers";
import RichText from "../rich-text/RichText";
import Container from "../../components/container/Container";

type ImageProps = {
    caption?: string;
    content?: ReactNode;
    alignment?: "left" | "right" | "center";
};

class Title extends React.Component<ImageProps> {
    constructor(params?) {
        super(params);
    }

    render() {
        return (
            <Container
                className={makeClass([
                    "d-title",
                    this.props.alignment && "align-" + this.props.alignment,
                ])}
            >
                {this.props.caption && <div className={"caption"}>{this.props.caption}</div>}

                {this.props.content}
            </Container>
        );
    }
}

export default Title;
