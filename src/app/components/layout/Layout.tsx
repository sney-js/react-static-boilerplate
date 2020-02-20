import React, { useEffect } from "react";
import { Head, useSiteData } from "react-static";
import { getUrl } from "../../utils/RespImage";
import { generateClassList } from "../../utils/helpers";
import GlobalLoader from "../global-loader/GlobalLoader";
import HeaderContainer from "../../containers/header/HeaderContainer";
import FooterContainer from "../../containers/footer/FooterContainer";

const styles = require("./layout.module.scss");

type MetaDataStructure = {
    title: string;
    description?: string;
    keywords?: string;
    image?: string;
};

type LayoutProps = {
    header?: any;
    footer?: any;
    cookieBanner?: any;
    metaData?: MetaDataStructure;
    locale?: string;
    globalLoader?: boolean;
    children?: any;
    theme?: "dark" | "light";
};

function Layout(props: LayoutProps) {
    const { header, footer, data } = useSiteData();
    const { metaData } = props;
    useEffect(() => {
        document.body["dataset"].theme = props.theme || "light";
    }, [props.theme]);
    return (
        <div className={generateClassList([styles.layout])}>
            <Head>
                <html lang={props.locale} />
                <title>{metaData?.title}</title>
                {metaData?.description ? (
                    <meta name="description" content={metaData.description} />
                ) : null}
                {metaData?.keywords ? <meta name="keywords" content={metaData.keywords} /> : null}
                {metaData?.image ? (
                    <meta
                        property="og:image"
                        content={metaData.image && getUrl(metaData.image).replace("//", "https://")}
                    />
                ) : null}

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

            {props.cookieBanner && <div className={styles.cookieBanner}>{props.cookieBanner}</div>}

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
