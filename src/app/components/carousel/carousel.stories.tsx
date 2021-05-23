import * as React from 'react';
import { Carousel, CarouselProps } from './Carousel';
import Header from '../header/Header';
import { Meta } from '@storybook/react/types-6-0';

export default {
  title: 'Components/Carousel',
  component: Header
} as Meta;

export const basic = (args: CarouselProps): React.ReactElement => {
  return <Carousel {...args} />;
};

basic.args = {
  items: [
    <img src='https://dummyimage.com/600x400/000/fff.jpg' />,
    <img src='https://dummyimage.com/1000x500/d435d4/fff.jpg' />,
    <img src='https://dummyimage.com/1600x400/000/fff.jpg' />
  ]
};
