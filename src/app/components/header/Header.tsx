import React from "react";
import { generateClassList } from "../../utils/helpers";
import Container from "../container/Container";
import LinkWrap from "../../containers/link/linkWrap";
import { RespImage } from "../../utils/RespImage";
import LinkElement from "../../elements/link/LinkElement";

const styles = require("./header.module.scss");

type HeaderProps = {
    title?: string;
    links?: Array<any>;
    logo?: any;
};

enum ModalContentType {
    NAVIGATION = "navigation",
}

type HeaderState = {
    modalIsActive: boolean;
};

const mapStateToProps = ({ theme, isLoggedIn, userData }) => {
    return {
        theme,
        isLoggedIn,
        userData,
    };
};

export class Header extends React.Component<HeaderProps, HeaderState> {
    headerRef: any;

    render() {
        console.log("HEADER", this.props);
        return (
            <header ref={this.headerRef} className={generateClassList([styles.header])}>
                <Container maxWidth padded_x>
                    <div className={styles.container}>
                        <div className={styles.logo}>
                            <LinkElement path={"/"}>
                                <RespImage image={this.props.logo} width={"100px"} />
                            </LinkElement>
                        </div>
                        <div className={styles.navigation}>
                            {this.props.links.map(l => {
                                return <LinkWrap {...l} />;
                            })}
                        </div>
                    </div>
                </Container>
            </header>
        );
    }
}

export default Header;
