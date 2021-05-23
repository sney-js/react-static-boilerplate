import * as React from "react";
import { Link } from "@reach/router";
import { LinkData } from "../../models/LinkData";
import { makeClass } from "../../utils/helpers";

export interface LinkElementProps extends LinkData, React.HTMLAttributes<HTMLElement> {}

const LinkElement = (props: LinkElementProps) => {
    const generalProps = {
        onClick: props.onClick && ((e) => props.onClick(e)),
        className: makeClass(["link", props.className]),
        title: props.title,
    };
    return (
        <React.Fragment>
            {props.isExternal ? (
                <a
                    {...generalProps}
                    {...(props.path && { href: props.path })}
                    target={props.newTab ? "_blank" : "_self"}
                >
                    {props.children || props.title}
                </a>
            ) : props.path ? (
                <Link
                    {...generalProps}
                    to={props.path}
                    target={props.newTab ? "_blank" : "_self"}
                    onClick={(event) => {
                        if (!props.newTab) return;
                        event.preventDefault();
                        window.open(window.location.origin + props.path);
                    }}
                >
                    {props.children || props.title}
                </Link>
            ) : (
                <a {...generalProps}> {props.children || props.title}</a>
            )}
        </React.Fragment>
    );
};

export default LinkElement;
