import React, { useEffect, useState } from "react";
import { makeClass, HAS_WINDOW, WINDOW } from "../../utils/helpers";
import Container from "../container/Container";
import { useLocation } from "react-static";
import LinkWrap from "../../containers/link/linkWrap";
import Input, { InputType } from "../../elements/forms/Inputs";
import LanguageSelect, { getLang } from "./LanguageSelector";
import { LinkData } from "../../models/LinkData";
import { cleanPath } from "../../utils/Resolver";

const styles = require("./header.module.scss");

type LocaleData = {
    allLocales: Array<String>;
    defaultLocale: String;
};

type HeaderProps = {
    title?: string;
    links?: Array<LinkData>;
    logo?: JSX.Element;
    currentLocale?: string;
    logoLink?: LinkData;
    themeToggle?: boolean;
    localeData?: LocaleData;
};

const refreshToLocale = function (locale: string, oldLocale: string, defaultLocale: String) {
    if (!HAS_WINDOW) return;

    const getPathBreaks = function (pathname) {
        return pathname.split("/").filter((e) => e.length);
    };

    const location = WINDOW.location;

    let pathBreaks = getPathBreaks(location.pathname);
    pathBreaks.reverse().push(locale);
    pathBreaks = pathBreaks.reverse();
    pathBreaks = pathBreaks.filter((p) => p !== oldLocale && p !== defaultLocale);

    const joinedPath = pathBreaks.join("/");
    WINDOW.location.pathname = cleanPath(joinedPath);
};

export function Header(props: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState(false);

    let location = useLocation();
    if (!location && WINDOW) {
        location = WINDOW.location;
    }

    const allLocales = props.localeData?.allLocales;
    const defaultLocale = props.localeData?.defaultLocale;

    useEffect(() => {
        setMenuOpen(false);
    }, [location?.pathname]);

    const classNames = makeClass([styles.header]);

    let languageSelector = null;
    if (props.localeData) {
        languageSelector = (
            <div className={styles.toggleLang}>
                <LanguageSelect
                    languages={allLocales.map(getLang)}
                    activeLanguage={getLang(props.currentLocale)}
                    onLanguageChange={(locale, oldLocale) => {
                        refreshToLocale(locale, oldLocale, defaultLocale);
                    }}
                />
            </div>
        );
    }

    return (
        <header className={classNames}>
            <Container
                breakpoint="Tablet"
                className={makeClass([styles.modalWrapper, !!menuOpen && styles.modalWrapperOpen])}
            >
                <MobileModal links={props.links} languageToggle={languageSelector} />
            </Container>

            <Container layoutType="maxWidth" pad="Horizontal">
                <div className={styles.container}>
                    <div className={styles.logo}>
                        <LinkWrap {...props.logoLink}>{props.logo || null}</LinkWrap>
                    </div>
                    <div className={styles.container}>
                        <Container className={styles.actionsDesktop}>
                            <Container className={styles.navigation}>
                                {props.links &&
                                    props.links.map((l, i) => {
                                        return <LinkWrap key={`link${i}`} {...l} />;
                                    })}
                            </Container>
                            {props.themeToggle && (
                                <Container className={styles.toggleTheme}>
                                    <Input
                                        type={InputType.toggle}
                                        label="Theme"
                                        name="global-theme"
                                        onChange={(data) => {
                                            const selected = data.target.checked;
                                            document.body.dataset.theme = selected
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
    const className = makeClass([styles.burgerIcon, isMenuOpen && styles.burgerOpen]);
    return (
        <div className="burger-root">
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
    const className = makeClass([styles.mobileRoot]);
    return (
        <nav className={className}>
            <Container pad="All" className={makeClass([styles.mobileRoot, styles.navigation])}>
                {languageToggle && React.cloneElement(languageToggle)}
                <br />
                {links && links.map((l, i) => <LinkWrap key={`link${i}`} {...l} />)}
            </Container>
        </nav>
    );
};

export default Header;
