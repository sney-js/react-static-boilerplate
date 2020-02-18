import React, { Component } from "react";
import { connect } from "react-redux";
import { Head } from "react-static";
import { getUrl } from "../../utils/RespImage";
import { generateClassList } from "../../utils/helpers";
import { globalHistory } from "@reach/router";
import { Theme } from "../../models/Theme";
import { Cookie } from "../../models/Cookie";
import Cookies from "js-cookie";
import GlobalLoader from "../global-loader/GlobalLoader";

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
    metaData: MetaDataStructure;
    locale?: string;
    filledBackground?: boolean;
    isLoggedIn: boolean;
    theme?: Theme;
    globalLoader?: boolean;
};

const mapStateToProps = ({ title, theme, isLoggedIn, globalLoader }) => ({
    title,
    theme,
    isLoggedIn,
    globalLoader,
});

class Layout extends Component<LayoutProps> {
    headerRef: any;

    componentDidMount(): void {
    }

    componentWillUnmount(): void {
    }

    componentDidUpdate(prevProps): void {
        if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
            if (this.props.isLoggedIn) {
                this.scrollTo();
            }
        }

        if(prevProps.children !== this.props.children) {
            this.scrollTo(window.location.hash);
        }
    }

    constructor(params) {
        super(params);
        if (typeof document !== "undefined") {
            this.scrollTo(window.location.hash);
        }
    }

    scrollTo(hash?) {
        window.scrollTo({
            top: 0,
        });
        if (!hash) return;

        setTimeout(_ => {
            let element = document.querySelector(hash);
            if (!element) return;
            const position = element.getBoundingClientRect();
            window.scrollTo(0,  position.top - 120);
        });
    }

    render() {
        const { metaData, header, footer } = this.props;
        return (
            <div
                className={generateClassList([
                    styles.layout,
                    this.props.theme && styles[this.props.theme],
                ])}
            >
                <Head>
                    <html lang={this.props.locale} />
                    <title>{metaData.title}</title>
                    {metaData.description ? (
                        <meta name="description" content={metaData.description} />
                    ) : null}
                    {metaData.keywords ? (
                        <meta name="keywords" content={metaData.keywords} />
                    ) : null}
                    {metaData.image ? (
                        <meta
                            property="og:image"
                            content={
                                metaData.image && getUrl(metaData.image).replace("//", "https://")
                            }
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

                {this.props.cookieBanner && (
                    <div className={styles.cookieBanner}>{this.props.cookieBanner}</div>
                )}

                <div
                    className={generateClassList([
                        styles.content,
                        this.props.filledBackground && styles.filledBackground,
                    ])}
                >
                    {header &&
                        React.cloneElement(header, {
                            ...header.props,
                            ref: instance => {
                                this.headerRef = instance;
                            },
                        })}

                    <main>{this.props.children}</main>
                </div>

                {footer &&
                    React.cloneElement(footer, {
                        ...footer.props,
                        onLogin: e => {
                            if (this.headerRef) {
                                this.headerRef.onLoginClick(e);
                            }
                        },
                    })}

                {this.props.globalLoader && <GlobalLoader />}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Layout);
