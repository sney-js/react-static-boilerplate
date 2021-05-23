import React, { FC } from 'react';
import { makeClass } from '../../utils/helpers';
import Spinner from '../../elements/Loaders';
import { IcArrowRight } from '../SvgElements';
import './Button.scss';

export type ButtonProps = {
  /**
   * The display title of the button
   */
  title?: string;
  /**
   * Defaults to primary button style
   */
  appearance?: 'primary' | 'secondary' | 'invisible';
  /**
   * Changes the button state to disabled
   */
  disabled?: boolean;
  /**
   * Changes the button state to loading
   */
  isLoading?: boolean;
  /**
   * Displays icon on the right with text. Center without.
   */
  icon?: JSX.Element;
  /**
   * Should an arrow appear when mouse is hovered over the button?
   */
  hoverArrow?: boolean;
  /**
   * Whether the parent element should be a `<div>` instead of a `<button>`
   */
  asDiv?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Buttons provide cues for actions and events. These fundamental components allow users to process actions or navigate an experience.
 */
const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const {
    appearance,
    isLoading,
    asDiv,
    title,
    icon,
    hoverArrow,
    className,
    ...rest
  } = props;

  const classes = makeClass([
    className,
    'd-button',
    appearance,
    props.disabled && 'disabled',
    icon && 'icon-primary',
    icon && (props.children || title) && 'icon-primary-inline',
    (isLoading || hoverArrow) && !icon && 'icon-secondary',
    !icon && isLoading && 'icon-secondary-show'
  ]);

  return React.createElement(
    asDiv ? 'div' : 'button',
    { className: classes, ...rest },
    <React.Fragment>
      {props.children || title}
      {isLoading && (
        <i className='d-button-icon'>
          <Spinner type='gg-spinner' />
        </i>
      )}
      {!icon && !isLoading && hoverArrow && (
        <i className='d-button-icon'>
          <IcArrowRight />
        </i>
      )}
      {icon && <i className='d-button-icon'>{icon}</i>}
    </React.Fragment>
  );
};

Button.displayName = 'Button';
Button.defaultProps = {
  appearance: 'primary'
};
export default Button;
