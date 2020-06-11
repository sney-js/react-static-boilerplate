import React, { FC } from 'react';
import { makeClass } from 'utils/Helpers';
import Spinner from 'elements/Loaders';

export type ButtonProps = {
  /**
   * This will replace children if provided
   */
  title?: string;
  /**
   * One of 'primary' | 'secondary'
   */
  appearance?: 'primary' | 'secondary';
  /**
   * Displays icon on the right with text. Center without.
   */
  icon?: JSX.Element;
  /**
   * Add this prop for a loading indicator
   */
  isLoading?: boolean;
  /**
   * If the parent element should be a `<button>` or `<div>`
   */
  asDiv?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Use `Button` to highlight key info with a predefined status.
 */
const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const { appearance, isLoading, asDiv, title, icon, ...rest } = props;

  const classes = makeClass([
    props.className,
    'd-button',
    appearance,
    props.disabled && 'disabled',
    icon && 'icon-primary',
    icon && (props.children || props.title) && 'icon-primary-inline',
    isLoading && !icon && !props.disabled && 'icon-secondary',
    !icon && isLoading && 'icon-secondary-show'
  ]);

  return React.createElement(
    asDiv ? 'div' : 'button',
    { className: classes, ...rest },
    <React.Fragment>
      {props.children || props.title}
      {isLoading && (
        <i className='d-button-icon'>
          <Spinner type='gg-spinner' />
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
