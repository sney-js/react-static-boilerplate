import React from "react";
import { connect } from "react-redux";
import Icon from "../../elements/icon/Icon";
import SvgMenu from "../../elements/svg-elements/Menu";
import SvgLogo from "../../elements/svg-elements/Logo";
import LinkElement from "../../elements/link/LinkElement";
import SvgClose from "../../elements/svg-elements/Close";
import { generateClassList } from "../../utils/helpers";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";

const styles = require("./header.module.scss");

type HeaderProps = {
    title?: string;
    navigation?: Array<any>;
    additionalLinks?: Array<any>;
};

enum ModalContentType {
    NAVIGATION = "navigation",
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
    headerRef: any;
    toolbarRef: any;
    defaultState = {
        modalIsActive: false,
        modalContent: null,
    };

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

    render() {
        return (
            <header ref={this.headerRef} className={generateClassList([styles.header])}>
                <div className={styles.content}>
                    {!this.state.modalIsActive && (
                        <div
                            className={styles.menu}
                            onClick={event => this.toggleNavigation(ModalContentType.NAVIGATION)}
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
                </div>
            </header>
        );
    }
}

export const HeaderConnected = connect(mapStateToProps, null, null, { forwardRef: true })(Header);

export default HeaderConnected;
