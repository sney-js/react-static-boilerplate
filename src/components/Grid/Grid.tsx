import React, { CSSProperties, FC } from 'react';
import { makeClass, setCSSVar } from 'utils/Helpers';

type GridProps = {
  /**
   * `grid-template-column` value
   */
  template?: string;
  /**
   * `grid-template-column` value for tablet and lower
   */
  templateTablet?: string;
  /**
   * `grid-template-column` value for mobile and lower
   */
  templateMobile?: string;
  /**
   * `grid-gap` value. Can be made responsive by modifying the value
   * of css variable on different breakpoints.
   */
  gap?: string;
  /**
   * Any set of React's CSS Properties
   */
  gridStyles?: CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>;

const Grid: FC<GridProps> = (props: GridProps) => {
  const {
    template,
    templateTablet,
    templateMobile,
    gap,
    gridStyles,
    ...rest
  } = props;

  const classNames = makeClass([props.className, 'layout-grid']);

  const styleVars = setCSSVar({
    '--grid-template': template,
    '--grid-template-tablet': templateTablet,
    '--grid-template-mobile': templateMobile || templateTablet,
    '--grid-gap': gap
  });

  const modifiedStyles = Object.assign(
    props.style || {},
    styleVars,
    props.gridStyles || {}
  );

  return (
    <section {...rest} className={classNames} style={modifiedStyles}>
      {props.children}
    </section>
  );
};

Grid.defaultProps = {
  template: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: 'var(--spacing-gap)'
};

export default Grid;
