import React, { ReactElement } from "react";
import "./carousel.scss";
import { generateClassList } from "../../utils/helpers";
import Arrow from "../button/Arrow";
import Container from "../../components/container/Container";

type CarouselProps = {
    items?: Array<ReactElement>;
    swipeThreshold?: number;
    padded?: boolean;
    animateIn?: boolean;
};
type CarouselState = {
    currentItem: any;
    offset: number;
    currentIndex: number;
};

export class Carousel extends React.Component<CarouselProps, CarouselState> {
    state = {
        offset: 0,
        currentItem: null,
        currentIndex: 0,
    };
    itemsRefs = [];
    containerRef: any;
    touchStart: number;
    moveDelta: number;
    lastTranslate: number = 0;
    lastWindowWidth: number = 0;

    static defaultProps = {
        items: [],
        swipeThreshold: 50,
        padded: true,
    };

    onResize = e => {
        if (this.lastWindowWidth !== e.target.innerWidth) {
            this.init(this.state.currentIndex);
        }
    };

    init(index?) {
        this.lastWindowWidth = window.innerWidth;
        const item = this.itemsRefs[index || 0];

        this.setState({
            offset: item.offsetLeft || 0,
            currentItem: item,
            currentIndex: index || 0,
        });
    }

    componentDidUpdate(
        prevProps: Readonly<CarouselProps>,
        prevState: Readonly<CarouselState>,
        snapshot?: any,
    ): void {
        if (prevProps.items !== this.props.items) {
            this.init();
        }
    }

    componentDidMount(): void {
        window.addEventListener("resize", this.onResize, false);
        this.init();
    }

    componentWillUnmount(): void {
        window.removeEventListener("resize", this.onResize, false);
    }

    onNextClick() {
        this.moveTo(this.itemsRefs[this.state.currentIndex + 1]);
    }

    onPrevClick() {
        this.moveTo(this.itemsRefs[this.state.currentIndex - 1]);
    }

    onIndicatorClick(index) {
        this.moveTo(this.itemsRefs[index]);
    }

    moveTo(item) {
        if (!item) return this.updateTranslate();
        this.setState({
            offset: item.offsetLeft,
            currentItem: item,
            currentIndex: this.itemsRefs.indexOf(item),
        });
    }

    initElements(items) {
        return items.map((item, index) => {
            return (
                <React.Fragment key={index}>
                    <div
                        className={generateClassList([
                            "bpl-carousel-item",
                            this.state.currentIndex == index && "active",
                        ])}
                        ref={elementRef => {
                            this.itemsRefs[index] = elementRef;
                        }}
                    >
                        {item}
                    </div>
                    <div className={"bpl-carousel-item-gap"} />
                </React.Fragment>
            );
        });
    }

    handleTouchStart(e) {
        this.touchStart = parseInt(this.unify(e).clientX);
    }

    handleTouchEnd() {
        if (Math.abs(this.moveDelta) < this.props.swipeThreshold || !this.moveDelta) {
            this.touchStart = null;
            this.moveDelta = null;
            this.updateTranslate();
            return;
        }

        const direction = this.moveDelta >= 0;
        this.touchStart = null;
        this.moveDelta = null;

        if (direction) {
            this.onPrevClick();
        }

        if (!direction) {
            this.onNextClick();
        }
    }

    handleTouchMove(e) {
        this.moveDelta = parseInt(this.unify(e).clientX) - this.touchStart;
        this.updateTranslate();
    }

    updateTranslate() {
        Object.assign(this.containerRef.style, this.getCurrentStyle());
    }

    unify(e) {
        return e.changedTouches ? e.changedTouches[0] : e;
    }

    getCurrentStyle() {
        const offset = this.state.offset;
        const currentTranslate = offset - this.moveDelta || offset;
        if (Math.abs(this.lastTranslate - currentTranslate) > 10) {
            this.lastTranslate = currentTranslate;
        }
        return {
            transform: `translateX(-${this.lastTranslate}px)`,
        };
    }

    render() {
        return (
            <section className={"bpl-carousel-wrapper"}>
                <Container
                    pad={"Horizontal"}
                    layoutType={"maxWidth"}
                    animateIn={this.props.animateIn}
                >
                    <section className={"bpl-carousel"}>
                        <div className={"bpl-carousel-items-wrapper"}>
                            {this.state.currentIndex > 0 && (
                                <Arrow
                                    className={"prev-button"}
                                    direction={"left"}
                                    onClick={e => this.onPrevClick()}
                                />
                            )}
                            {this.state.currentIndex < this.props.items.length - 1 && (
                                <Arrow
                                    className={"next-button"}
                                    direction={"right"}
                                    onClick={e => this.onNextClick()}
                                />
                            )}

                            <div
                                onTouchStart={touchStartEvent =>
                                    this.handleTouchStart(touchStartEvent)
                                }
                                onTouchMove={touchMoveEvent => this.handleTouchMove(touchMoveEvent)}
                                onTouchEnd={() => this.handleTouchEnd()}
                                className={generateClassList([
                                    "bpl-carousel-items-container",
                                    this.touchStart && "is-dragging",
                                ])}
                                style={this.getCurrentStyle()}
                                ref={elementRef => (this.containerRef = elementRef)}
                            >
                                {this.initElements(this.props.items)}
                            </div>
                        </div>
                        {this.props.items.length > 1 && (
                            <div className={"bpl-carousel-indicators-container"}>
                                {this.props.items.map((ref, index) => {
                                    return (
                                        <div
                                            className={"bpl-carousel-indicator-wrapper"}
                                            onClick={e => this.onIndicatorClick(index)}
                                        >
                                            <div
                                                key={index}
                                                className={generateClassList([
                                                    index === this.state.currentIndex && "active",
                                                    "bpl-carousel-indicator",
                                                ])}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>
                </Container>
            </section>
        );
    }
}
