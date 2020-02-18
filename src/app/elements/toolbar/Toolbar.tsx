import * as React from "react";
import { Component } from "react";
import { generateClassList } from "../../utils/helpers";
import { globalHistory } from "@reach/router";

const styles = require("./toolbar.module.scss");

type ToolbarProps = {
    autoHideOnScroll?: boolean;
    className?: string;
    contentRef: any;
    theme?: string;
};

type ToolbarState = {
    hidden: boolean;
    withShadow: boolean;
    height: number;
};

class Toolbar extends Component<ToolbarProps, ToolbarState> {
    lastDirection: "up" | "down";
    visibleThreshold = 80;
    scrollDelta = 0;
    offsetTop = 0;
    lastScrollTop;
    contentRef: any;
    toolbarRef: any;
    toolbarContentRef: any;
    routeChanged$: any;

    constructor(params?) {
        super(params);
        this.contentRef = this.props.contentRef;
        this.toolbarRef = React.createRef();
        this.toolbarContentRef = React.createRef();
        let scrollTop = 0;

        if (typeof window !== "undefined" && typeof document !== "undefined") {
            scrollTop = this.getScrollTop();
        }

        this.state = {
            hidden: false,
            withShadow: scrollTop > this.offsetTop,
            height: 0,
        };
    }

    onResize = () => {
        this.offsetTop = this.getTopOffset();
        this.updateFillerHeight();
    };

    componentWillReceiveProps() {
        this.toggleHeaderVisibility(true);
        this.scrollDelta = 0;
    }

    updateFillerHeight() {
        const fillerHeight = this.getFillerHeight();
        if (this.state.height != fillerHeight) {
            this.setState({
                height: fillerHeight,
            });
        }
    }

    getTopOffset() {
        if (!this.toolbarRef.current) return 0;
        const rect = this.toolbarRef.current.getBoundingClientRect();
        const offset = (rect.top || 0) + (this.getScrollTop() || 0);
        return offset > 0 ? Math.round(offset) : 0;
    }

    getFillerHeight() {
        const rect = this.contentRef.current.getBoundingClientRect();
        return rect.height || 0;
    }

    componentDidMount(): void {
        this.offsetTop = this.getTopOffset();
        this.updateFillerHeight();
        this.onWindowScroll();
        window.document.addEventListener("scroll", this.onWindowScroll, false);
        window.addEventListener("resize", this.onResize, false);
        this.routeChanged$ = globalHistory.listen(({ location }) => {
            setTimeout(_ => {
                this.onResize();
            }, 50);
        });
    }

    componentWillUnmount(): void {
        window.document.removeEventListener("scroll", this.onWindowScroll);
        window.removeEventListener("resize", this.onResize);
        this.routeChanged$();
    }

    getScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop;
    }

    onWindowScroll = () => {
        const scrollTop = this.getScrollTop();
        const withShadow = scrollTop > this.offsetTop;

        if (this.state.withShadow !== withShadow) {
            this.setState({
                withShadow: withShadow,
            });
        }

        const delta = Math.abs(scrollTop - this.lastScrollTop);
        if (scrollTop > this.lastScrollTop) {
            this.onScrollDown(scrollTop, delta);
        } else {
            this.onScrollUp(scrollTop, delta);
        }
        this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    onScrollUp(scrollTop, delta) {
        if (this.lastDirection == "up") {
            this.scrollDelta += delta;
        } else {
            this.scrollDelta = 0;
            this.lastDirection = "up";
        }
        const overcomeThreshold = this.scrollDelta > this.visibleThreshold;
        if (overcomeThreshold || scrollTop <= this.offsetTop) {
            this.toggleHeaderVisibility(true);
        }
    }

    onScrollDown(scrollTop, delta) {
        if (this.lastDirection == "down" && scrollTop >= this.offsetTop) {
            this.scrollDelta += delta;
        } else {
            this.scrollDelta = 0;
            this.lastDirection = "down";
        }

        const overcomeThreshold = this.scrollDelta > this.visibleThreshold;
        if (overcomeThreshold && scrollTop > this.offsetTop) {
            this.toggleHeaderVisibility(false);
        }
    }

    toggleHeaderVisibility(flag?) {
        if (flag) {
            this.setState({
                hidden: false,
            });
        }

        if (!flag) {
            this.setState({
                hidden: true,
            });
        }
    }

    getMaxHeight() {
        const scrollTop = this.getScrollTop();
        const delta = Math.round(this.offsetTop - scrollTop);
        return delta > 0 ? `calc(100vh - ${delta}px)` : null;
    }

    render() {
        return (
            <div ref={this.toolbarRef}>
                <div
                    ref={this.toolbarContentRef}
                    style={{ maxHeight: !this.props.autoHideOnScroll && this.getMaxHeight() }}
                    className={generateClassList([
                        this.props.className,
                        styles.toolbar,
                        this.state.withShadow && styles.withShadow,
                        !this.props.autoHideOnScroll && styles.noShadow,
                        this.props.autoHideOnScroll && this.state.hidden && styles.hidden,
                    ])}
                >
                    {this.props.children}
                </div>
                <div
                    className={generateClassList([styles.filler, styles[this.props.theme]])}
                    style={{ height: this.state.height }}
                />
            </div>
        );
    }
}

export default Toolbar;
