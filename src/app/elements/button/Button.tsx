import * as React from "react";
import { ReactNode } from "react";
import "./button.scss";
import { generateClassList } from "../../utils/helpers";
import { LinkElementProps } from "../link/LinkElement";
import Icon, { IconProps } from "../icon/Icon";
import Arrow from "./Arrow";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    shape?:
        | "icon"
        | "icon-filled"
        | "default";
    link?: React.ReactElement<LinkElementProps>;
    label?: string;
    icon?: ReactNode;
    iconProps?: IconProps;
    text?: string;
    preventDefaultOnLoading?: boolean;
    isLoading?: boolean;
    active?: boolean;
}

class Button extends React.Component<ButtonProps> {
    static defaultProps = {
        preventDefaultOnLoading: true,
    };

    constructor(params?) {
        super(params);
    }

    onClick(e) {
        if (this.props.isLoading && this.props.preventDefaultOnLoading) {
            e.stopPropagation();
            e.preventDefault();
            return;
        }
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }

    getButtonContent() {
        switch (this.props.shape) {
            case "icon":
                return this.getIconButton();
            case "icon-filled":
                return this.getIconButton("filled", {
                    innerScale: 0.6,
                });
            default:
                return this.getDefaultButton();
        }
    }

    getDefaultButton() {
        return (
            <React.Fragment>
                {this.props.text ? this.props.text : this.props.children}
            </React.Fragment>
        );
    }

    getIconButton(type?, props?) {
        const { icon, iconProps, link } = this.props;
        return (
            <Icon
                type={type}
                icon={icon || (link && link.props.associatedIcon)}
                {...{ ...props, ...iconProps }}
            />
        );
    }

    getButtonTitle() {
        return (
            this.props.label ||
            this.props.text ||
            (this.props.link && this.props.link.props.title) ||
            (this.props as Arrow["props"]).direction
        );
    }

    render() {
        const { className, preventDefaultOnLoading, active, ...rest } = this.props;
        const iconButtons = ["icon", "icon-filled", "icon-transparent", "icon-filled-outlined"];
        const classList = generateClassList([
            "bpl-button",
            className,
            iconButtons.includes(this.props.shape) && "bpl-icon-button",
            active && "active",
        ]);

        let wrapper = this.props.link ? this.props.link : <button title={this.getButtonTitle()} />;

        return React.cloneElement(
            wrapper,
            {
                ...(this.props.link && this.props.link.props),
                ...rest,
                onClick: e => this.onClick(e),
                className: classList,
            },
            React.Children.toArray(this.getButtonContent()),
        );
    }
}

export default Button;
