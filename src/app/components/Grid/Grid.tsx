import React, { FC } from 'react';
import { makeClass, setCSSVar } from '../../utils/helpers';
import './Grid.scss';

export type GridProps = {
  /**
   * CSS's `grid-template-column` value
   */
  template?: string;
  /**
   * CSS's `grid-template-column` value for tablet and lower
   */
  templateTablet?: string;
  /**
   * CSS's `grid-template-column` value for mobile and lower
   */
  templateMobile?: string;
  /**
   * CSS's `grid-gap` value. Can be made responsive by modifying the value
   * of css variable on different breakpoints.
   */
  gap?: string;
  /**
   * CSS's `align-items` value. E.g. `'start' | 'center' | 'end' | 'stretch'`
   */
  align?: 'start' | 'center' | 'end' | 'stretch' | string;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * The `<Grid />` component extends `React.HTMLAttributes<HTMLDivElement>`.
 *
 * A basic CSS grid component controlled through react props. Can be used as a container to add groups of `<Button />` with `gap` prop to control spacing between children.
 *
 * Can also be used to build bigger layouts that change on different viewports.
 * You can set additional CSS values by setting `styles` prop.
 * @param props
 * @constructor
 */
const Grid: FC<GridProps> = (props: GridProps) => {
  const { template, templateTablet, templateMobile, gap, align, ...rest } =
    props;

  const classNames = makeClass([props.className, 'layout-grid']);

  const styleVars = setCSSVar({
    '--grid-template': template,
    '--grid-template-tablet': templateTablet,
    '--grid-template-mobile': templateMobile || templateTablet,
    '--grid-gap': gap,
    '--grid-align': align
  });

  const modifiedStyles = Object.assign(props.style || {}, styleVars);

  return (
    <div {...rest} className={classNames} style={modifiedStyles}>
      {props.children}
    </div>
  );
};

Grid.defaultProps = {
  template: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: 'var(--spacing-gap)',
  align: 'center'
};

export default Grid;
