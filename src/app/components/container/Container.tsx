import React, { Component } from "react";
import { makeClass } from "../../utils/helpers";
import { FadeOnScroll } from "../../elements/fadeup/fadeup";
import { isMobile, isTablet, isTabletOrMobile } from "../../utils/Device";

const styles = require("./container.module.scss");
export type ContainerProps = {
    id?: string;
    children?: any;
    className?: string;
    /**
     * When using a layoutType, a child div is created. This will set class on that.
     */
    classNameInner?: string;
    animateIn?: boolean;
    layoutType?: "maxWidth" | "splitView" | "grid";
    pad?: "All" | "Vertical" | "Horizontal" | "Bottom" | "Desktop-Horizontal";
    breakpoint?: "All" | "Desktop" | "Tablet" | "Mobile";
    background?: "None" | "Primary" | "Secondary" | "Themed";
    gridColumn?: string;
    gridColumnTablet?: string;
    gridColumnMobile?: string;
};

class Container extends Component<ContainerProps> {
    constructor(props) {
        super(props);
    }

    render() {
        let classNames = makeClass([
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

        let gridTemplateColumns = this.props.gridColumn;
        if (isTabletOrMobile()) {
            gridTemplateColumns = this.props.gridColumnTablet || this.props.gridColumn;
            if (this.props.gridColumnMobile && isMobile()) {
                gridTemplateColumns = this.props.gridColumnMobile;
            }
        }

        return (
            <FadeOnScroll
                animate={this.props.animateIn}
                uniqueKey={classNames + "-" + this.props.id}
            >
                <section id={this.props.id} className={classNames}>
                    {this.props.layoutType ? (
                        <section
                            className={makeClass([
                                this.props.classNameInner,
                                this.props.layoutType === "maxWidth" && styles.maxWidth,
                                this.props.layoutType === "splitView" && styles.splitCol2,
                                this.props.layoutType === "splitView" && styles.padded_Splitview,
                                this.props.layoutType === "grid" && styles.layoutGrid,
                            ])}
                            style={{ gridTemplateColumns: gridTemplateColumns }}
                        >
                            {this.props.children}
                        </section>
                    ) : (
                        this.props.children
                    )}
                </section>
            </FadeOnScroll>
        );
    }
}

export default Container;
