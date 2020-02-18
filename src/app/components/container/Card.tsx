import React, { Component } from "react";
import { ContainerProps } from "./Container";
const styles = require("./container.module.scss");

export enum CardFold {
    TOP_LEFT = "top_left",
    TOP_RIGHT = "top_right",
    BOTTOM_LEFT = "bottom_left",
    BOTTOM_RIGHT = "bottom_right",
    NO_FOLD = "no_fold",
}

export enum CardFoldOn {
    MOBILE = "mobile",
    TABLET = "tablet",
}

type CardProps = ContainerProps & {
    fold?: CardFold;
    foldOn?: CardFoldOn;
    clipped?: boolean;
};

class Card extends Component<CardProps> {
    render() {
        let classNames = [
            this.props.className,
            styles.card,
            this.props.maxWidth && styles.maxWidth,
            styles[this.props.fold],
            this.props.background && `bg-${this.props.background}`,
            this.props.padded && styles.padded,
            this.props.padded_x && styles.padded_x,
            this.props.padded_y && styles.padded_y,
            this.props.clipped && styles.clipped,
            this.props.foldOn && styles[this.props.foldOn],
        ]
            .filter(e => !!e)
            .join(" ")
            .trim();

        return (
            <div className={"card " + classNames}>
                <React.Fragment>{this.props.children}</React.Fragment>
            </div>
        );
    }
}

export default Card;
