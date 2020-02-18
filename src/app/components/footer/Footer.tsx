import React, { Component } from "react";
import { generateClassList } from "../../utils/helpers";

const styles = require("./footer.module.scss");

type FooterProps = {
    title?: string;
};

const mapStateToProps = ({ isLoggedIn }) => {
    return {
        isLoggedIn,
    };
};

export class Footer extends Component<FooterProps> {
    render() {
        return (
            <footer className={generateClassList([styles.footer])}>
                <h3>COPYRIGHT</h3>
            </footer>
        );
    }
}

export default Footer;
