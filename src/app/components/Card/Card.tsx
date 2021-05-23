import React, { FC } from 'react';
import { makeClass } from '../../utils/helpers';
import Infotile from '../Infotile';
import { InfotileProps } from '../Infotile/Infotile';
import {
  extractInfoTileProps,
  withoutInfoTileProps
} from '../Infotile/InfotileHelper';
import './Card.scss';

export type CardProps = InfotileProps & {
  /**
   * Image HTML tags. e.g. `<img>`
   */
  image?: JSX.Element;
  /**
   * `overlay` would lay text elements on top of the image
   */
  appearance?: 'normal' | 'overlay';
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * The `Card` component example.
 * @param props
 * @constructor
 */
const Card: FC<CardProps> = (props: CardProps) => {
  const { image, className, appearance, ...rest } = props;

  const infoTileProps = extractInfoTileProps(rest);
  const restCard = withoutInfoTileProps(rest);

  const classes = makeClass([
    'd-card',
    className,
    // position absolute on no image results is no card rendered.
    // This says if no image, force appearance normal
    'd-card__appearance-' + (image ? appearance : 'normal')
  ]);

  return (
    <div className={classes} {...restCard}>
      {image && <div className='d-card__image'>{image}</div>}
      <div className='d-card__body'>
        <Infotile {...infoTileProps} />
        {props.children}
      </div>
    </div>
  );
};

Card.defaultProps = {
  appearance: 'normal'
};

export default Card;
