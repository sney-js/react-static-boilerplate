import * as React from "react";
import { Component } from "react";
import Container from "../container/Container";
import Cookies from "js-cookie";
import { Cookie } from "../../models/Cookie";
import { globalHistory } from "@reach/router";

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
    routeChanged$: any;

    componentDidMount(): void {
        if (!Cookies.get(Cookie.FUNCTIONAL)) {
            this.setCookies();
            this.setState({
                visible: true,
            });
        }
        this.routeChanged$ = globalHistory.listen(({ location }) => {
            this.setState({
                visible: false,
            });
        });
    }

    componentWillUnmount(): void {
        this.routeChanged$();
    }

    componentDidUpdate(prevProps: Readonly<CookieBannerProps>, prevState): void {
        if (prevState.visible !== this.state.visible) {
            window.dispatchEvent(new Event("resize"));
        }
    }

    setCookies() {
        Cookies.set(Cookie.FUNCTIONAL, "true", { expires: 365 });
        this.props.setAnalyticsCookie && Cookies.set(Cookie.ANALYTICS, "true", { expires: 365 });
        this.props.setTrackingCookie && Cookies.set(Cookie.TRACKING, "true", { expires: 365 });
    }

    render() {
        if (!this.state.visible) return null;
        return (
            <Container className={styles.cookieBanner} maxWidth padded_x>
                {this.props.caption && <div className={styles.caption}>{this.props.caption}</div>}
                {this.props.content}
            </Container>
        );
    }
}

export default CookieBanner;
