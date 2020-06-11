import React, { FC } from 'react';
import { makeClass } from 'utils/Helpers';
import { GenericProps, LinkType } from "../../models";
import Grid from 'components/Grid';
import Link from 'elements/Link';

export type CardType = {
  /**
   * Determines the title if provided
   */
  title: string;
  /**
   * Determines the secondary title if provided
   */
  subTitle?: string;
  /**
   * useful if you want to use markup in the description like bold, italics, etc.
   * e.g.
   * ```
   * <p>Use <strong>Love2Shop</strong> digital reward codes to shop with some of the UK’s leading brands.</p>
   * ```
   */
  description?: JSX.Element | string;
  /**
   * Determines the footnote if provided
   */
  footnote?: string;
  link?: LinkType;
  /**
   * Image that will be provided with markup from contentful.
   * e.g.
   * ```
   * <div className='d-image'><img src='https://via.placeholder.com/450x250' alt='Alt Text' /></div>
   * ```
   */
  image?: JSX.Element;
} & GenericProps;

type CardProps = CardType;

/**
 * The `Card` component example.
 * @param props
 * @constructor
 */
const Card: FC<CardProps> = (props: CardProps) => {
  const {
    title,
    subTitle,
    description,
    link,
    footnote,
    image,
    className
  } = props;

  const classes = makeClass(['d-card', className]);
  const template = footnote ? '1fr 1fr' : '2fr';
  return (
    <div className={classes}>
      <div className='d-card__image'>{image}</div>
      <div className='d-card__body'>
        <div className='d-card__header'>
          <h3 className='d-card__title'>{title}</h3>
          <h5 className='d-card__subtitle'>{subTitle && subTitle}</h5>
        </div>

        <div className='d-card__description'>{description}</div>

        <Grid template={template}>
          <div>
            <Link to='' {...link} appearance='primary' />
          </div>

          <small className='d-card__footnote'>
            <strong>{footnote}</strong>
          </small>
        </Grid>
      </div>
    </div>
  );
};

export default Card;
