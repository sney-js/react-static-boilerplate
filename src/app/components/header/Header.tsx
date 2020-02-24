import React, { useEffect, useState } from "react";
import { generateClassList } from "../../utils/helpers";
import Container from "../container/Container";
import LinkElement from "../../elements/link/LinkElement";
import { useLocation, useRouteData } from "react-static";
import LinkWrap from "../../containers/link/linkWrap";
import Input, { InputType } from "../../elements/forms/Inputs";
import Form from "../../elements/forms/Form";
import LanguageSelect, { ALL_LOCALES, getLang } from "./LanguageSelector";
import { DEFAULT_LOCALE } from "../../utils/Resolver";

const styles = require("./header.module.scss");

type HeaderProps = {
    languageToggle?: boolean;
    title?: string;
    links?: Array<any>;
    logo?: any;
    themeToggle?: boolean;
};

let getPathBreaks = function(pathname) {
    return pathname.split("/").filter(e => e.length);
};

function getCurrentLocale(pathname) {
    const paths = getPathBreaks(pathname);
    if (ALL_LOCALES.find(l => l === paths[1])) {
        console.log("has locale : " + paths[1]);
        return paths[1];
    }
    return undefined;
}

export function Header(props: HeaderProps) {
    console.log("HEADER", props);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setMenuOpen(false);
    }, [location?.pathname]);

    const classNames = generateClassList([styles.header]);
    const languageSelector = (
        <div className={styles.toggleLang}>
            <LanguageSelect
                languages={[getLang("en-US"), getLang("fr")]}
                activeLanguage={getLang("en-US")}
                setActiveLanguage={locale => {
                    console.log(locale);
                    (window as any).locale = locale;
                    //TODO use react way
                    console.log(location.pathname);
                    const currentLocale = getCurrentLocale(location.pathname);
                    let pathBreaks = getPathBreaks(location.pathname);
                    if (currentLocale) {
                        pathBreaks[0] = locale;
                    } else {
                        // in default locale so no lang prefix
                        if (locale !== DEFAULT_LOCALE) {
                            pathBreaks.reverse().push(locale);
                            pathBreaks = pathBreaks.reverse();
                        }
                    }
                    const newPath: string = pathBreaks.join("/");
                    (window as any).location.pathname = newPath;
                }}
            />
        </div>
    );
    return (
        <header className={classNames}>
            <Container
                breakpoint={"Tablet"}
                className={generateClassList([
                    styles.modalWrapper,
                    !!menuOpen && styles.modalWrapperOpen,
                ])}
            >
                <MobileModal links={props.links} languageToggle={languageSelector} />
            </Container>

            <Container layoutType={"maxWidth"} pad={"Horizontal"}>
                <div className={styles.container}>
                    <div className={styles.logo}>
                        <LinkElement path={"/"}>{props.logo || null}</LinkElement>
                    </div>
                    <div className={styles.container}>
                        <Container className={styles.actionsDesktop}>
                            <Container className={styles.navigation}>
                                {props.links &&
                                    props.links.map(l => {
                                        return <LinkWrap {...l} />;
                                    })}
                            </Container>
                            {props.themeToggle && (
                                <Container className={styles.toggleTheme}>
                                    <Input
                                        type={InputType.toggle}
                                        label={"Theme"}
                                        name={"global-theme"}
                                        onChange={data => {
                                            const selected = data.target.checked;
                                            document.body["dataset"].theme = selected
                                                ? "dark"
                                                : "light";
                                        }}
                                    />
                                </Container>
                            )}
                            {languageSelector}
                        </Container>
                        <div className={styles.actionsMobile}>
                            <BurgerMenu isMenuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                        </div>
                    </div>
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

const MobileModal = ({ links, languageToggle }) => {
    let className = generateClassList([styles.mobileRoot]);
    return (
        <nav className={className}>
            <Container
                pad={"All"}
                className={generateClassList([styles.mobileRoot, styles.navigation])}
            >
                {languageToggle && React.cloneElement(languageToggle)}
                <br />
                {links && links.map(l => <LinkWrap {...l} />)}
            </Container>
        </nav>
    );
};

export default Header;
