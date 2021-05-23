import React, { ReactElement } from 'react';
import './carousel.scss';
import { makeClass, WINDOW } from '../../utils/helpers';
import Container from '../container';
import Button from '../../elements/Button';

export type CarouselProps = {
  items?: Array<ReactElement>;
  swipeThreshold?: number;
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
    currentIndex: 0
  };

  itemsRefs = [];
  containerRef: any;
  touchStart: number;
  moveDelta: number;
  lastTranslate = 0;
  lastWindowWidth = 0;

  static defaultProps = {
    items: [],
    swipeThreshold: 50
  };

  onResize = (e) => {
    if (this.lastWindowWidth !== e.target.innerWidth) {
      this.init(this.state.currentIndex);
    }
  };

  init(index?) {
    this.lastWindowWidth = WINDOW.innerWidth;
    const item = this.itemsRefs[index || 0];

    this.setState({
      offset: item.offsetLeft || 0,
      currentItem: item,
      currentIndex: index || 0
    });
  }

  componentDidUpdate(
    prevProps: Readonly<CarouselProps>,
    prevState: Readonly<CarouselState>,
    snapshot?: any
  ): void {
    if (prevProps.items !== this.props.items) {
      this.init();
    }
  }

  componentDidMount(): void {
    WINDOW.addEventListener('resize', this.onResize, false);
    this.init();
  }

  componentWillUnmount(): void {
    WINDOW.removeEventListener('resize', this.onResize, false);
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
      currentIndex: this.itemsRefs.indexOf(item)
    });
  }

  initElements(items) {
    return items.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <div
            className={makeClass([
              'd-carousel-item',
              this.state.currentIndex === index && 'active'
            ])}
            ref={(elementRef) => {
              this.itemsRefs[index] = elementRef;
            }}
          >
            {item}
          </div>
          <div className='d-carousel-item-gap' />
        </React.Fragment>
      );
    });
  }

  handleTouchStart(e) {
    this.touchStart = parseInt(this.unify(e).clientX);
  }

  handleTouchEnd() {
    if (
      Math.abs(this.moveDelta) < this.props.swipeThreshold ||
      !this.moveDelta
    ) {
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
      transform: `translateX(-${this.lastTranslate}px)`
    };
  }

  render() {
    return (
      <section className='d-carousel-wrapper'>
        <Container layout='maxWidth' animateIn={this.props.animateIn}>
          <section className='d-carousel'>
            <div className='d-carousel-items-wrapper'>
              {this.state.currentIndex > 0 && (
                <Button
                  className='prev-button'
                  title='left'
                  onClick={(e) => this.onPrevClick()}
                />
              )}
              {this.state.currentIndex < this.props.items.length - 1 && (
                <Button
                  className='next-button'
                  title='right'
                  onClick={(e) => this.onNextClick()}
                />
              )}

              <div
                onTouchStart={(touchStartEvent) =>
                  this.handleTouchStart(touchStartEvent)
                }
                onTouchMove={(touchMoveEvent) =>
                  this.handleTouchMove(touchMoveEvent)
                }
                onTouchEnd={() => this.handleTouchEnd()}
                className={makeClass([
                  'd-carousel-items-container',
                  this.touchStart && 'is-dragging'
                ])}
                style={this.getCurrentStyle()}
                ref={(elementRef) => (this.containerRef = elementRef)}
              >
                {this.initElements(this.props.items)}
              </div>
            </div>
            {this.props.items.length > 1 && (
              <div className='d-carousel-indicators-container'>
                {this.props.items.map((ref, index) => {
                  return (
                    <div
                      className='d-carousel-indicator-wrapper'
                      onClick={(e) => this.onIndicatorClick(index)}
                    >
                      <div
                        key={index}
                        className={makeClass([
                          index === this.state.currentIndex && 'active',
                          'd-carousel-indicator'
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
