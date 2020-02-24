import React, { useEffect } from "react";
import { Head, useSiteData } from "react-static";
import { getUrl } from "../../utils/RespImage";
import { generateClassList } from "../../utils/helpers";
import GlobalLoader from "../global-loader/GlobalLoader";
import HeaderContainer from "../../containers/header/HeaderContainer";
import FooterContainer from "../../containers/footer/FooterContainer";
import { IMetaDataFields } from "../../../contentful/@types/contentful";
import CookieBannerContainer from "../../containers/cookie-banner/CookieBannerContainer";

const styles = require("./layout.module.scss");

type MetaDataStructure = {
    title: string;
    description?: string;
    keywords?: string;
    image?: string;
};

type LayoutProps = {
    locale?: string;
    globalLoader?: boolean;
    children?: any;
    theme?: "dark" | "light";
};

export const MetaData = (props: IMetaDataFields) => {
    return (
        <Head>
            <title>{props?.title}</title>
            {props?.description ? <meta name="description" content={props.description} /> : null}
            {props?.keywords ? <meta name="keywords" content={props.keywords?.join(",")} /> : null}
            {props?.image ? (
                <meta
                    property="og:image"
                    content={props.image && getUrl(props.image).replace("//", "https://")}
                />
            ) : null}
        </Head>
    );
};

function Layout(props: LayoutProps) {
    const { header, footer, data } = useSiteData();
    useEffect(() => {
        const bodyElement = document.body["dataset"];
        ( window as any).theme = bodyElement && bodyElement.theme? props.theme : "light";
    }, [props.theme]);
    return (
        <div className={generateClassList([styles.layout])}>
            <Head>
                <html lang={props.locale} />

                <link rel="manifest" href="/manifest.json" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-title" content="BPL" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black" />
                <link
                    rel="apple-touch-icon"
                    sizes="152x152"
                    href="/assets/app-icons/icon.png"
                    type="image/png"
                />
            </Head>

            <div className={styles.cookieBanner}>{CookieBannerContainer()}</div>

            {header && <HeaderContainer item={header} />}
            <div className={generateClassList([styles.content])}>
                <main>{props.children}</main>
            </div>

            {footer && <FooterContainer item={footer} />}

            {props.globalLoader && <GlobalLoader />}
        </div>
    );
}

export default Layout;
