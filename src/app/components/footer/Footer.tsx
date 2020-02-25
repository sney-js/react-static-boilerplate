import React from "react";
import Container from "../container/Container";
import LinkWrap from "../../containers/link/linkWrap";

const styles = require("./footer.module.scss");

export default ({ content, links }) => (
    <footer className={styles.footer}>
        <Container layoutType={"maxWidth"} pad={"All"}>
            <div className={styles.links}>
                <Container layoutType={"grid"} gridColumn={"1fr 1fr 1fr"} gridColumnMobile={"1fr"}>
                    {links?.map((l, i) => (
                        <LinkWrap key={`footer${i}`} {...l} />
                    ))}
                </Container>
            </div>
            <br />
            <small>{content}</small>
        </Container>
    </footer>
);
