import React, { useEffect, useState } from "react";
import { generateClassList } from "../../utils/helpers";
import Container from "../container/Container";
import LinkElement from "../../elements/link/LinkElement";
import { useLocation } from "react-static";
import LinkWrap from "../../containers/link/linkWrap";
import { RespImage } from "../../utils/RespImage";

const styles = require("./header.module.scss");

type HeaderProps = {
    title?: string;
    links?: Array<any>;
    logo?: any;
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
                mobileOnly
                className={generateClassList([
                    styles.modalWrapper,
                    !!menuOpen && styles.modalWrapperOpen,
                ])}
            >
                <MobileModal links={props.links} />
            </Container>
            <Container maxWidth padded_x zIndex={1000}>
                <div className={styles.container}>
                    <div className={styles.logo}>
                        <LinkElement path={"/"}>
                            <RespImage image={props.logo} width={"100px"} />
                        </LinkElement>
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
            <Container padded className={generateClassList([styles.mobileRoot, styles.navigation])}>
                <ul>
                    {links &&
                        links.map(l => (
                            <li>
                                <LinkWrap {...l} />
                            </li>
                        ))}
                </ul>
            </Container>
        </nav>
    );
};

export default Header;
