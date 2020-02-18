import * as React from "react";
import Button, { ButtonProps } from "../button/Button";
import Icon from "../icon/Icon";
import SvgArrow from "../svg-elements/Arrow";
import { generateClassList } from "../../utils/helpers";
import "./arrow.scss";

interface ArrowProps extends ButtonProps {
    direction?: "left" | "right";
}

class Arrow extends React.Component<ArrowProps> {
    constructor(params?) {
        super(params);
    }

    render() {
        const { className, ...rest } = this.props;
        return (
            <Button className={generateClassList(["bpl-arrow-button", className])} {...rest}>
                <Icon className={this.props.direction == "left" ? "mirrored" : ""}>
                    <SvgArrow />
                </Icon>
            </Button>
        );
    }
}

export default Arrow;
