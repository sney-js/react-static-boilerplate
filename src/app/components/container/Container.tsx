import React, { Component } from "react";
import { generateClassList } from "../../utils/helpers";
import { FadeOnScroll } from "../../elements/fadeup/fadeup";

const styles = require("./container.module.scss");
export type ContainerProps = {
    id?: string;
    background?: string;
    backgroundPosition?: "top" | "fill" | "bottom";
    padded?: boolean;
    padded_x?: boolean;
    padded_y?: boolean;
    padded_bottom?: boolean;
    padded_x_desktop?: boolean;
    half_padded_y?: boolean;
    children?: any;
    className?: string;
    maxWidth?: boolean;
    /**
     * when you have two direct children, use can use this to split their width 50%
     */
    splitView?: boolean;
    paddedSplitView?: boolean;
    animateIn?: boolean;
    nonMobileOnly?: boolean;
    mobileOnly?: boolean;
    zIndex?:number;
};

class Container extends Component<ContainerProps> {
    render() {
        let classNames = generateClassList([
            this.props.className,
            this.props.background && `bg bg-${this.props.background}`,
            this.props.backgroundPosition && `bg-position-${this.props.backgroundPosition}`,
            styles.container,
            this.props.padded && styles.padded,
            this.props.padded_bottom && styles.padded_bottom,
            this.props.padded_x && styles.padded_x,
            this.props.padded_x_desktop && styles.padded_x_desktop,
            this.props.padded_y && styles.padded_y,
            this.props.half_padded_y && styles.half_padded_y,
            this.props.nonMobileOnly && styles.desktopOnly,
            this.props.mobileOnly && styles.mobileOnly,
            this.props.animateIn && "fadeup-initial",
        ]);

        let classNamesSplitView = generateClassList([
            styles.splitCol2,
            this.props.paddedSplitView && styles.padded_Splitview,
        ]);

        let styleCustom = {};
        if (this.props.zIndex){
            styleCustom['z-index'] = this.props.zIndex;
        }
        return (
            <FadeOnScroll
                animate={this.props.animateIn}
                uniqueKey={classNames + "-" + this.props.id}
            >
                <section id={this.props.id} className={classNames} style={styleCustom}>
                    <div className={this.props.maxWidth && styles.maxWidth}>
                        {this.props.splitView ? (
                            <div className={classNamesSplitView}>{this.props.children}</div>
                        ) : (
                            <React.Fragment>{this.props.children}</React.Fragment>
                        )}
                    </div>
                </section>
            </FadeOnScroll>
        );
    }
}

export default Container;
