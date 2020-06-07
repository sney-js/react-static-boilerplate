import * as React from "react";
import { Component } from "react";
import { Link } from "@reach/router";
import { LinkData } from "../../models/LinkData";
import { makeClass } from "../../utils/helpers";

export interface LinkElementProps extends LinkData {
    onClick?: Function;
    className?: string;
}

class LinkElement extends Component<LinkElementProps> {
    constructor(params?) {
        super(params);
    }

    render() {
        const generalProps = {
            onClick: this.props.onClick && (e => this.props.onClick(e)),
            className: makeClass(["link", this.props.className]),
            title: this.props.title,
        };
        return (
            <React.Fragment>
                {this.props.isExternal ? (
                    <a
                        {...generalProps}
                        {...(this.props.path && { href: this.props.path })}
                        target={this.props.newTab ? "_blank" : "_self"}
                    >
                        {this.props.children || this.props.title}
                    </a>
                ) : this.props.path ? (
                    <Link
                        {...generalProps}
                        to={this.props.path}
                        target={this.props.newTab ? "_blank" : "_self"}
                        onClick={event => {
                            if (!this.props.newTab) return;
                            event.preventDefault();
                            window.open(window.location.origin + this.props.path);
                        }}
                    >
                        {this.props.children || this.props.title}
                    </Link>
                ) : (
                    <a {...generalProps}> {this.props.children || this.props.title}</a>
                )}
            </React.Fragment>
        );
    }
}

export default LinkElement;
