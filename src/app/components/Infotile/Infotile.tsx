import React, { FC } from 'react';
import { makeClass } from '../../utils/helpers';
import { extractInfoTileProps } from './InfotileHelper';
import LinkElement from '../../elements/link/LinkElement';
import { LinkData } from '../../models/LinkData';
import './Infotile.scss';

export type InfotileProps = {
  /**
   * Determines the title if provided
   */
  title?: string;
  /**
   * Determines the secondary title if provided. This appears below Title
   */
  titleSecondary?: string;
  /**
   * Determines the subTitle if provided. This appears above Title
   */
  subTitle?: string;
  /**
   * Any ReactElement or string
   */
  description?: JSX.Element | string;
  /**
   * Main CTA
   */
  link?: LinkData;
  /**
   * Secondary CTA
   */
  linkSecondary?: LinkData;
  // /**
  //  * Any sent children will be placed at the end. Use this to customise this component
  //  * with additional markup
  //  */
  // children?: React.ReactChild;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * The `Infotile` component example.
 * @param props
 * @constructor
 */
const Infotile: FC<InfotileProps> = (props: InfotileProps) => {
  const { title, titleSecondary, subTitle, description, link, linkSecondary } =
    extractInfoTileProps(props);

  const classes = makeClass([
    'd-infotile',
    props.className,
    'd-infotile-appearance__normal'
  ]);

  return (
    <div className={classes}>
      <div className='d-infotile__body'>
        {subTitle && <h5 className='d-infotile__subTitle'>{subTitle}</h5>}
        {(title || titleSecondary) && (
          <h3
            className={makeClass([
              'd-infotile__header',
              titleSecondary && 'd-infotile__header_Secondary'
            ])}
          >
            <span className='d-infotile__title'>{title}</span>
            <span className='d-infotile__titleSecondary'>
              {titleSecondary && titleSecondary}
            </span>
          </h3>
        )}

        {description && (
          <div className='d-infotile__description'>{description}</div>
        )}

        {(link || linkSecondary) && (
          <div className='d-infotile__links'>
            {link && <LinkElement {...link} appearance='primary' />}
            {linkSecondary && (
              <LinkElement {...linkSecondary} appearance='secondary' />
            )}
          </div>
        )}
        {props.children}
      </div>
    </div>
  );
};

export default Infotile;
