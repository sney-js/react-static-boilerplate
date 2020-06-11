import React, { FC } from 'react';
import { makeClass } from 'utils/Helpers';
import Button from '../Button';
import { ButtonProps } from '../Button/Button';
import { Link as RouterLink } from 'react-router-dom';

export type LinkTypeLocal = {
  /**
   * Determines the title if provided
   */
  title?: string;
  /**
   * Determines the href of link
   */
  to: string;
  /**
   * Determines the internal/external of link
   */
  newTab?: boolean;
  /**
   * useful if you want to use React Router's or React-static `Link` library.
   * e.g.
   * ```
   * import { Link as RouterLink} from "react-router-dom";
   * ...
   * <Link provider={<RouterLink/>} to='/about' />
   * ```
   */
  provider?: JSX.Element;
};

type LinkProps = ButtonProps & LinkTypeLocal;

/**
 * `Link` is a wrapper around button to that provides page navigation
 */
const Link: FC<LinkProps> = (props: LinkProps) => {
  const { to, appearance, newTab, title, provider, ...rest } = props;
  const className = makeClass(['d-link']);

  const mainChildren =
    appearance === undefined ? (
      props.children
    ) : (
      <Button appearance={appearance} {...rest}>
        {props.children || title}
      </Button>
    );

  if (provider && !newTab) {
    return React.cloneElement(
      provider,
      {
        to,
        ...rest
      },
      mainChildren
    );
  }

  return React.createElement(
    'a',
    {
      className,
      href: to,
      target: newTab ? '_blank' : '_self',
      ...rest
    },
    mainChildren
  );
};

Link.displayName = 'Link';
// TODO change this link if using a different router
Link.defaultProps = {
  provider: <RouterLink/>
};
export default Link;
