import * as React from "react";
import { Component } from "react";
import Container from "../container/Container";
import Cookies from "js-cookie";
import { Cookie } from "../../models/Cookie";
import { globalHistory } from "@reach/router";
import Button from "../../elements/button/Button";
import { WINDOW } from "../../utils/helpers";

const styles = require("./cookie-banner.module.scss");

export type CookieBannerProps = {
    caption?: string;
    content?: any;
    setAnalyticsCookie?: boolean;
    setTrackingCookie?: boolean;
};

class CookieBanner extends Component<CookieBannerProps> {
    state = {
        visible: false,
    };

    componentDidMount(): void {
        if (!Cookies.get(Cookie.FUNCTIONAL)) {
            this.setState({
                visible: true,
            });
        }
    }

    componentDidUpdate(prevProps: Readonly<CookieBannerProps>, prevState): void {
        if (prevState.visible !== this.state.visible) {
            WINDOW.dispatchEvent(new Event("resize"));
        }
    }

    setCookies() {
        Cookies.set(Cookie.FUNCTIONAL, "true", { expires: 365 });
        this.props.setAnalyticsCookie && Cookies.set(Cookie.ANALYTICS, "true", { expires: 365 });
        this.props.setTrackingCookie && Cookies.set(Cookie.TRACKING, "true", { expires: 365 });
        this.setState({
            visible: false,
        });
    }

    render() {
        if (!this.state.visible) return null;
        let caption = this.props.caption || "Cookie Policy";
        return (
            <Container className={styles.cookieBanner} layoutType={"maxWidth"} pad={"Horizontal"}>
                <div className={styles.container}>
                    <div className={styles.caption}>{caption || "LOL"}</div>
                    {this.props.content}
                    <Button onClick={() => this.setCookies()}>Got it!</Button>
                </div>
            </Container>
        );
    }
}

export default CookieBanner;
