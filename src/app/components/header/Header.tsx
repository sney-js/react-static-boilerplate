import React, { ReactElement } from "react";
import { connect } from "react-redux";
import { Navigation } from "./navigation/Navigation";
import { globalHistory } from "@reach/router";
import Icon, { IconType } from "../../elements/icon/Icon";
import SvgMenu from "../../elements/svg-elements/Menu";
import SvgLogo from "../../elements/svg-elements/Logo";
import LinkElement from "../../elements/link/LinkElement";
import SvgAccount from "../../elements/svg-elements/Account";
import SvgAccountDashed from "../../elements/svg-elements/AccountDashed";
import { AuthService } from "../../core/auth/authService";
import SvgClose from "../../elements/svg-elements/Close";
import Toolbar from "../../elements/toolbar/Toolbar";
import { applyInterpolation, generateClassList } from "../../utils/helpers";
import Container from "../container/Container";
import { Theme } from "../../models/Theme";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import { BPLUserData } from "../../models/BPLUserData";

const styles = require("./header.module.scss");

type HeaderProps = {
    title?: string;
    theme?: string;
    loginLabel?: string;
    loggedInUserIndicator?: string;
    logoutLabel?: string;
    navigation?: Array<any>;
    additionalLinks?: Array<any>;
    servicelineLink?: any;
    loggedInUserLink?: any;
    servicelineTitle?: string;
    servicelineDescription?: string;
    isLoggedIn?: boolean;
    loginForm?: ReactElement<any>;
    userData?: BPLUserData;
};

enum ModalContentType {
    NAVIGATION = "navigation",
    LOGIN = "login",
}

type HeaderState = {
    modalIsActive: boolean;
    navigation?: Array<any>;
    additionalLinks?: Array<any>;
    modalContent: ModalContentType;
    isLoggedIn?: boolean;
};

const mapStateToProps = ({ theme, isLoggedIn, userData }) => {
    return {
        theme,
        isLoggedIn,
        userData,
    };
};

export class Header extends React.Component<HeaderProps, HeaderState> {
    routeChanged$;

    loginForm: ReactElement<any>;
    defaultState = {
        modalIsActive: false,
        modalContent: null,
    };
    headerRef: any;
    toolbarRef: any;

    constructor(props?) {
        super(props);
        this.headerRef = React.createRef();
        this.toolbarRef = React.createRef();
        this.state = {
            ...this.defaultState,
            navigation: this.props.navigation || [],
            additionalLinks: this.props.additionalLinks || [],
        };
    }

    componentDidMount(): void {
        this.routeChanged$ = globalHistory.listen(location => {
            this.closeModal();
        });
        this.setState({
            isLoggedIn: this.props.isLoggedIn,
        });
        if (this.props.loginForm) {
            this.loginForm = (
                <Container className={styles.loginWrapper}>
                    {React.cloneElement(this.props.loginForm, {
                        ...this.props.loginForm.props,
                        onSuccess: e => this.onLoginSuccess(e),
                    })}
                </Container>
            );
        }
    }

    componentWillUnmount(): void {
        this.routeChanged$();
    }

    componentDidUpdate(prevProps) {
        if (this.props.isLoggedIn !== this.state.isLoggedIn) {
            this.setState({
                isLoggedIn: this.props.isLoggedIn,
            });
        }
    }

    toggleNavigation(contentType: ModalContentType, flag?) {
        let toState = flag;

        if (typeof flag === "undefined" && contentType) {
            toState = true;
        }

        if (
            typeof flag === "undefined" &&
            (typeof contentType === "undefined" || this.state.modalContent === contentType)
        ) {
            toState = false;
        }

        if (toState) {
            this.setState({
                modalIsActive: true,
                modalContent: contentType,
            });

            if (this.toolbarRef.current) {
                disableBodyScroll(this.toolbarRef.current.toolbarContentRef.current);
            }

            return;
        }

        this.closeModal();
    }

    closeModal() {
        clearAllBodyScrollLocks();

        this.setState({
            modalIsActive: false,
            modalContent: null,
        });
    }

    async onLogoutClick(e) {
        await AuthService.getInstance().then(instance => {
            return instance.logout();
        });
        this.closeModal();
    }

    onLoginClick(e) {
        this.toggleNavigation(ModalContentType.LOGIN);
    }

    onLoginSuccess(e) {
        setTimeout(_ => {
            this.closeModal();
        });
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar
                    autoHideOnScroll={!this.state.modalIsActive}
                    contentRef={this.headerRef}
                    ref={this.toolbarRef}
                    theme={!this.state.modalIsActive && this.props.theme}
                >
                    <header
                        ref={this.headerRef}
                        className={generateClassList([
                            !this.state.modalIsActive && styles[this.props.theme],
                            styles.header,
                        ])}
                    >
                        <div className={styles.content}>
                            {!this.state.modalIsActive && (
                                <div
                                    className={styles.menu}
                                    onClick={event =>
                                        this.toggleNavigation(ModalContentType.NAVIGATION)
                                    }
                                >
                                    <Icon>
                                        <SvgMenu />
                                    </Icon>
                                </div>
                            )}

                            {this.state.modalIsActive && (
                                <div className={styles.menu} onClick={event => this.closeModal()}>
                                    <Icon>
                                        <SvgClose />
                                    </Icon>
                                </div>
                            )}

                            <div className={styles.flex} />
                            <div className={styles.logo}>
                                <LinkElement path={"/"}>
                                    <SvgLogo />
                                </LinkElement>
                            </div>
                            <nav className={styles.navigation}>{this.state.navigation}</nav>
                            <div className={styles.flex} />

                            {this.state.isLoggedIn &&
                                this.props.loggedInUserLink &&
                                React.cloneElement(
                                    this.props.loggedInUserLink,
                                    {
                                        className: styles.userIcon,
                                        ...this.props.loggedInUserLink,
                                    },
                                    <>
                                        <span className={styles.loginIndicatorLabel}>
                                            {applyInterpolation(this.props.loggedInUserIndicator, this.props.userData)}
                                        </span>
                                        <Icon
                                            type={IconType.INTERACTIVE}
                                            theme={
                                                (!this.state.modalIsActive && this.props.theme) ||
                                                Theme.YELLOW
                                            }
                                        >
                                            <SvgAccount />
                                        </Icon>
                                    </>,
                                )}

                            {!this.state.isLoggedIn && (
                                <div
                                    onClick={event => {
                                        this.toggleNavigation(ModalContentType.LOGIN);
                                    }}
                                    className={styles.userIcon}
                                >
                                    <span className={styles.loginIndicatorLabel}>
                                        {this.props.loginLabel}
                                    </span>
                                    <Icon
                                        type={
                                            (this.state.modalIsActive &&
                                                this.state.modalContent == ModalContentType.LOGIN &&
                                                IconType.FILLED) ||
                                            IconType.INTERACTIVE
                                        }
                                        theme={
                                            (!this.state.modalIsActive && this.props.theme) ||
                                            Theme.YELLOW
                                        }
                                    >
                                        <SvgAccountDashed />
                                    </Icon>
                                </div>
                            )}
                        </div>
                    </header>

                    {this.state.modalIsActive && (
                        <div className={styles.modalWrapper}>
                            {this.state.modalContent == "navigation" && (
                                <Navigation
                                    isLoggedIn={this.props.isLoggedIn}
                                    theme={!this.state.modalIsActive && this.props.theme}
                                    loginLabel={this.props.loginLabel}
                                    logoutLabel={this.props.logoutLabel}
                                    servicelineLink={this.props.servicelineLink}
                                    servicelineTitle={this.props.servicelineTitle}
                                    servicelineDescription={this.props.servicelineDescription}
                                    navigation={this.state.navigation}
                                    additionalLinks={this.state.additionalLinks}
                                    onLogoutClick={e => this.onLogoutClick(e)}
                                    onLoginClick={e => this.onLoginClick(e)}
                                />
                            )}

                            {this.state.modalContent == "login" && this.loginForm && this.loginForm}
                        </div>
                    )}
                </Toolbar>

                <div
                    onClick={event => this.closeModal()}
                    className={[styles.overlay, this.state.modalIsActive ? styles.active : ""]
                        .join(" ")
                        .trim()}
                />
            </React.Fragment>
        );
    }
}

export const HeaderConnected = connect(
    mapStateToProps,
    null,
    null,
    { forwardRef: true },
)(Header);

export default HeaderConnected;
