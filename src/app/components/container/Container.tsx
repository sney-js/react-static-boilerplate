import React, { Component } from "react";
import { generateClassList } from "../../utils/helpers";
import { FadeOnScroll } from "../../elements/fadeup/fadeup";

const styles = require("./container.module.scss");
export type ContainerProps = {
    id?: string;
    children?: any;
    className?: string;
    animateIn?: boolean;
    layoutType?: "maxWidth" | "splitView";
    pad?: "All" | "Vertical" | "Horizontal" | "Bottom" | "Desktop-Horizontal";
    breakpoint?: "All" | "Desktop" | "Tablet" | "Mobile";
    background?: "None" | "Primary" | "Secondary" | "Themed";
};

class Container extends Component<ContainerProps> {
    render() {
        let classNames = generateClassList([
            this.props.className,
            styles.container,
            this.props.pad === "All" && styles.padded,
            this.props.pad === "Horizontal" && styles.padded_x,
            this.props.pad === "Vertical" && styles.padded_y,
            this.props.pad === "Bottom" && styles.padded_bottom,
            this.props.pad === "Desktop-Horizontal" && styles.padded_x_desktop,
            this.props.breakpoint === "Desktop" && styles.desktopOnly,
            this.props.breakpoint === "Tablet" && styles.tabletOnly,
            this.props.breakpoint === "Mobile" && styles.mobileOnly,
            this.props.background && `bg bg-${this.props.background}`,
            this.props.animateIn && "fadeup-initial",
        ]);

        const isMaxWidth = this.props.layoutType === "maxWidth";
        const isSplitView = this.props.layoutType === "splitView";

        return (
            <FadeOnScroll
                animate={this.props.animateIn}
                uniqueKey={classNames + "-" + this.props.id}
            >
                <section id={this.props.id} className={classNames}>
                    {isMaxWidth || isSplitView ? (
                        <div
                            className={generateClassList([
                                isMaxWidth && styles.maxWidth,
                                isSplitView && styles.splitCol2,
                                isSplitView && styles.padded_Splitview,
                            ])}
                        >
                            {this.props.children}
                        </div>
                    ) : (
                        this.props.children
                    )}
                </section>
            </FadeOnScroll>
        );
    }
}

export default Container;
