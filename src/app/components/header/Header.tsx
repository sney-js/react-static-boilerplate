import React from "react";
import { generateClassList } from "../../utils/helpers";
import Container from "../container/Container";
import LinkWrap from "../../containers/link/linkWrap";
import { RespImage } from "../../utils/RespImage";

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
        console.log(this.props.logo);
        return (
            <header ref={this.headerRef} className={generateClassList([styles.header])}>
                <div className={styles.logo} >
                    <RespImage image={this.props.logo} width={"300px"}/>
                </div>
                <div className={styles.navigation} >
                    {this.props.links.map(l => {
                        return <LinkWrap {...l} />;
                    })}
                </div>
            </header>
        );
    }
}

export default Header;
