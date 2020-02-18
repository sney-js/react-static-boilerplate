import React, { Component } from "react";
import LinkElement from "../../../elements/link/LinkElement";
import Button from "../../../elements/button/Button";

const styles = require("./navigation.module.scss");

type NavigationProps = {
    navigation?: Array<any>;
    additionalLinks?: Array<any>;
    theme?: string;
    isVisible?: boolean;
    onNavigationLinkClick?: Function;
    servicelineLink: any;
    servicelineTitle: string;
    servicelineDescription: string;
    loginLabel: string;
    logoutLabel?: string;
    isLoggedIn?: boolean;
    onLogoutClick?: Function;
    onLoginClick?: Function;
};

export class Navigation extends Component<NavigationProps> {
    constructor(props?) {
        super(props);
    }

    render() {
        return (
            <div
                className={[
                    styles[this.props.theme],
                    styles.navigation,
                    this.props.isVisible && styles.visible,
                ]
                    .filter(e => !!e)
                    .join(" ")
                    .trim()}
            >
                <div className={styles.navigationLinks}>{this.props.navigation}</div>
                <div className={styles.additionalLinks}>
                    {this.props.isLoggedIn ? (
                        <LinkElement onClick={this.props.onLogoutClick}>
                            {this.props.logoutLabel || "Log-out"}
                        </LinkElement>
                    ) : (
                        <LinkElement onClick={this.props.onLoginClick}>
                            {this.props.loginLabel || "Log-in"}
                        </LinkElement>
                    )}

                    {this.props.additionalLinks}
                </div>
                <div className={styles.navigationFooter}>
                    {this.props.servicelineLink && (
                        <Button shape={"icon-filled"} link={this.props.servicelineLink}/>
                    )}

                    {this.props.servicelineTitle && <h2>{this.props.servicelineTitle}</h2>}

                    {this.props.servicelineDescription && (
                        <div className={styles.serviceline}>
                            {this.props.servicelineDescription}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
