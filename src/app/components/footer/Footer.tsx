import React, { Component, ReactElement } from "react";
import { connect } from "react-redux";
import { generateClassList, splitIntoChunks } from "../../utils/helpers";
import Container from "../container/Container";
import LinkElement from "../../elements/link/LinkElement";
import { AuthService } from "../../core/auth/authService";
import Button from "../../elements/button/Button";

const styles = require("./footer.module.scss");

type FooterProps = {
    links?: Array<ReactElement<LinkElement["props"]>>;
    additionalLinks?: Array<ReactElement<LinkElement["props"]>>;
    copyright?: string;
    icon?: string;
    iconLink?: ReactElement<LinkElement["props"]>;
    isLoggedIn?: boolean;
    loginLabel?: string;
    logoutLabel?: string;
    className?: string;
    title?: string;
    onLogin?: Function;
};

const mapStateToProps = ({ isLoggedIn }) => {
    return {
        isLoggedIn,
    };
};

export class Footer extends Component<FooterProps> {
    onLoginClick(e) {
        if (this.props.onLogin) {
            this.props.onLogin(e);
        }
    }

    onLogoutClick(e) {
        return AuthService.getInstance().then(instance => {
            return instance.logout();
        });
    }

    getLinks(links) {
        if (!links) {
            links = [
                {
                    type: "filler",
                },
                {
                    type: "login",
                },
                {
                    type: "filler",
                },
            ];
        } else {
            links = [...links];
            links.splice(1, 0, { type: "login" });
        }

        while (links.length % 3 !== 0) {
            links.push({
                type: "filler",
            });
        }

        const splittedLinks = splitIntoChunks(links, 3);

        return (
            <div className={styles.links}>
                {splittedLinks.map((chunk, index) => {
                    return (
                        <Container key={index} maxWidth className={styles.linksRow}>
                            <Container padded_x>
                                {chunk.map((link, index) => {
                                    switch (link.type) {
                                        case "filler":
                                            return (
                                                <LinkElement key={index} className={styles.filler}>
                                                    &nbsp;
                                                </LinkElement>
                                            );
                                        case "login":
                                            return (
                                                <LinkElement
                                                    key={index}
                                                    onClick={e =>
                                                        this.props.isLoggedIn
                                                            ? this.onLogoutClick(e)
                                                            : this.onLoginClick(e)
                                                    }
                                                >
                                                    {this.props.isLoggedIn
                                                        ? this.props.logoutLabel || "Log-out"
                                                        : this.props.loginLabel || "Log-in"}
                                                </LinkElement>
                                            );
                                        default:
                                            return React.cloneElement(link, {
                                                key: index,
                                                ...link.props,
                                            });
                                    }
                                })}
                            </Container>
                        </Container>
                    );
                })}
            </div>
        );
    }

    render() {
        return (
            <footer className={generateClassList([this.props.className, styles.footer])}>
                {this.props.iconLink && (
                    <Button
                        className={styles.iconLink}
                        link={this.props.iconLink}
                        shape={"icon-filled"}
                    />
                )}

                <Container maxWidth className={styles.copySection}>
                    <Container padded_x>
                        <div className={styles.copy}>
                            <strong>{this.props.title}</strong>
                        </div>
                    </Container>
                </Container>
                {this.getLinks(this.props.links)}
                <Container maxWidth>
                    <Container padded_x>
                        <div className={styles.flexRow}>
                            <div
                                className={generateClassList([
                                    styles.additionalLinks,
                                    styles.flexItem,
                                ])}
                            >
                                {this.props.additionalLinks}
                            </div>
                            <div className={generateClassList([styles.copyright, styles.flexItem])}>
                                {this.props.copyright}
                            </div>
                        </div>
                    </Container>
                </Container>
            </footer>
        );
    }
}

export const FooterConnected = connect(mapStateToProps)(Footer);

export default FooterConnected;
