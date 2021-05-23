import * as React from "react";
import Button, { ButtonProps } from "../button/Button";
import Icon from "../icon/Icon";
import SvgArrow from "../svg-elements/Arrow";
import { makeClass } from "../../utils/helpers";
import "./arrow.scss";

export interface ArrowProps extends ButtonProps {
    direction?: "left" | "right";
}

const Arrow = (props: ArrowProps) => {
    const { className, ...rest } = props;
    return (
        <Button className={makeClass(["d-arrow-button", className])} {...rest}>
            <Icon className={props.direction === "left" ? "mirrored" : ""}>
                <SvgArrow />
            </Icon>
        </Button>
    );
};

export default Arrow;
