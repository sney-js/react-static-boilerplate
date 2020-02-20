import React from "react";
import Container from "../container/Container";
import LinkWrap from "../../containers/link/linkWrap";
const styles = require("./footer.module.scss");

export default ({ content, links }) => (
    <footer className={styles.footer}>
        <Container layoutType={"maxWidth"} pad={"All"}>
            <small>{content}</small>
            <div className={styles.links}>
                {links?.map(l => <LinkWrap {...l} />)}
            </div>
        </Container>
    </footer>
);
