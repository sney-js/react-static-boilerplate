import React, { FC } from 'react';
import { makeClass } from 'utils/Helpers';
import Link from 'elements/Link/';
import Button from 'elements/Button/';
import { LinkType } from 'models';

type NavigationProps = {
  /**
   * Displays the navigation links.
   * e.g.
   * `{
   * to: string, title: string
   * `}
   */
  siteLinks: LinkType[];
  /**
   * Displays the slide transition direction on mobile.
   * e.g.
   * `{
   * top | left | right
   * `}
   */
  mobileAnimationDirection?: 'top' | 'left' | 'right';
  /**
   * Displays the active state of Links.
   * e.g.
   * `{
   * true | false
   * `}
   */
  active?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

type ItemType = {
  title?: string;
  to: string;
  appearance?: string | any;
  icon?: JSX.Element;
};
/**
 * Use `Navigation` to highlight key info with a predefined status.
 */
const Navigation: FC<NavigationProps> = (props: NavigationProps) => {
  const {
    siteLinks,
    mobileAnimationDirection,
    className,
    active
  } = props;
  const [open, setOpen] = React.useState(false);
  const classes = makeClass(['d-nav', className]);

  return (
    <nav className={classes}>
      <Button
        className={'d-nav__nav-toggle'}
        data-open={open}
        onClick={() => setOpen(!open)}
        aria-label='Menu'
      />
      <div className='d-nav__item'>
        <ul
          className='d-nav__links'
          data-open={open}
          data-direction={mobileAnimationDirection}
        >
          {siteLinks?.map((item: ItemType, i: number) => (
            <li key={item.to + i} className='d-nav__links-link'>
              <Link
                to={item.to}
                className={active && i === 0 ? 'd-link active' : 'd-link'}
                aria-label={item.title}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

Navigation.displayName = 'Navigation';
Navigation.defaultProps = {
  mobileAnimationDirection: 'top'
};

export default Navigation;
