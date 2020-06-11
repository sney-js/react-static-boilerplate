import React, { FC } from 'react';
import { makeClass } from 'utils/Helpers';
import FadeOnScroll from '../Fadeup/Fadeup';

export type ContainerProps = {
  children: React.ReactNode;
  /**
   * Sets padding on this container as defined in css's `--gap-layout` variable.
   * This changes accordingly depending on device width.
   * `'All' | 'Vertical' | 'Horizontal' | 'Bottom' | 'Top'`
   */
  pad?: 'All' | 'Vertical' | 'Horizontal' | 'Bottom' | 'Top';
  /**
   * `'maxWidth' | 'columns' | 'centered' | 'maxWidthNarrow'`
   */
  layout?: 'maxWidth' | 'columns' | 'centered' | 'maxWidthNarrow';
  /**
   * `'dark' | 'light' | 'default' | 'none'`
   */
  theme?: 'dark' | 'light' | 'default' | 'none';
  /**
   * Whether this container should only show on given breakpoint
   * `'Desktop' | 'Tablet' | 'Mobile'`.
   * Note that Tablet will also cover Mobile.
   */
  breakpoint?: 'All' | 'Desktop' | 'Tablet' | 'Mobile' | 'Non-Desktop';
  /**
   * Sets a `background-$background` classname on this container
   * e.g. `.background-primary`
   */
  background?: string;
  /**
   * Whether this container should animate with fadein affect when in view
   */
  animateIn?: boolean;
  /**
   * Can be used to animate containers at a later time. For example cards in a sequence.
   */
  animateNow?: boolean;
  /**
   * @param isVisible boolean
   * @returns void
   */
  onVisible?: (isVisible: boolean) => void;
  /**
   * When used with `layout: columns`, this disables breaking on Mobile
   */
  responsiveColumn?: boolean;
} & React.HTMLAttributes<any>;

const Container: FC<ContainerProps> = (props: ContainerProps) => {
  const {
    pad,
    breakpoint,
    animateIn,
    animateNow,
    layout,
    onVisible,
    background,
    theme,
    responsiveColumn,
    ...rest
  } = props;

  const classNames = makeClass([
    props.className,
    'd-container',
    pad && `pad-${pad}`,
    layout && `layout-${layout}`,
    breakpoint && `breakpoint-${breakpoint}`,
    background && `background-${background}`,
    animateIn && 'fadeup-initial',
    responsiveColumn === false && `layout-column-noMobile`
  ]);

  const containerDom = (
    <section data-theme={theme || 'default'} {...rest} className={classNames}>
      {props.children}
    </section>
  );

  if (!(animateIn === true || animateNow === true)) {
    return containerDom;
  }

  return (
    <FadeOnScroll
      animate={animateIn}
      uniqueKey={classNames + '-' + props.id}
      onVisible={onVisible}
      enter={animateNow}
    >
      {containerDom}
    </FadeOnScroll>
  );
};

export default Container;
