import React, { useEffect, useState } from "react";
import { generateClassList } from "../../utils/helpers";
import Container from "../container/Container";
import LinkElement from "../../elements/link/LinkElement";
import { useLocation } from "react-static";
import LinkWrap from "../../containers/link/linkWrap";
import Input, { InputType } from "../../elements/forms/Inputs";
import Form from "../../elements/forms/Form";

const styles = require("./header.module.scss");

type HeaderProps = {
    title?: string;
    links?: Array<any>;
    logo?: any;
    themeToggle?: boolean;
};

export function Header(props: HeaderProps) {
    console.log("HEADER", props);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setMenuOpen(false);
    }, [location?.pathname]);

    const classNames = generateClassList([styles.header]);
    return (
        <header className={classNames}>
            <Container
                breakpoint={"Tablet"}
                className={generateClassList([
                    styles.modalWrapper,
                    !!menuOpen && styles.modalWrapperOpen,
                ])}
            >
                <MobileModal links={props.links} />
            </Container>

            <Container layoutType={"maxWidth"} pad={"Horizontal"}>
                <div className={styles.container}>
                    <div className={styles.logo}>
                        <LinkElement path={"/"}>{props.logo || null}</LinkElement>
                    </div>
                    <Container className={styles.actionsDesktop}>
                        <Container className={styles.navigation}>
                            {props.links &&
                                props.links.map(l => {
                                    return <LinkWrap {...l} />;
                                })}
                        </Container>
                    </Container>
                    <Container className={styles.actionsMobile}>
                        <BurgerMenu isMenuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                    </Container>
                    {props.themeToggle && (
                        <Container className={styles.toggleTheme}>
                        <Input
                            type={InputType.toggle}
                            label={"Theme"}
                            name={"global-theme"}
                            onChange={data => {
                                const selected = data.target.checked;
                                document.body["dataset"].theme = selected ? "dark" : "light";
                            }}
                        />
                        </Container>
                    )}
                </div>
            </Container>
        </header>
    );
}

const BurgerMenu = ({ isMenuOpen, setMenuOpen }) => {
    let className = generateClassList([styles.burgerIcon, isMenuOpen && styles.burgerOpen]);
    return (
        <div className={"burger-root"}>
            <a onClick={() => setMenuOpen(!isMenuOpen)}>
                <div className={className}>
                    <div className={styles.line1} />
                    <div className={styles.line2} />
                </div>
            </a>
        </div>
    );
};

const MobileModal = ({ links }) => {
    let className = generateClassList([styles.mobileRoot]);
    return (
        <nav className={className}>
            <Container
                pad={"All"}
                className={generateClassList([styles.mobileRoot, styles.navigation])}
            >
                {links && links.map(l => <LinkWrap {...l} />)}
            </Container>
        </nav>
    );
};

export default Header;
