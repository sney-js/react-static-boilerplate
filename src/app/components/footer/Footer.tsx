import React from "react";
import Container from "../container/Container";
import LinkWrap from "../../modules/link/linkWrap";
import { LinkData } from "../../models/LinkData";

const styles = require("./footer.module.scss");

export type FooterProps = {
    links?: Array<LinkData>;
    content?: React.ReactText;
};

const Footer = ({ content, links }: FooterProps) => (
    <footer className={styles.footer}>
        <Container layoutType="maxWidth" pad="All">
            <div className={styles.links}>
                <Container layoutType="grid" gridColumn="1fr 1fr 1fr" gridColumnMobile="1fr">
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
export default Footer;
