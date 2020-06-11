import React from 'react';
import Spinner from './Loaders';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Elements/Loaders',
  parameters: {
    componentSubtitle: 'Atom'
  },
  component: Spinner,
  decorators: [withKnobs]
};

export const spinner = ({ size = 1 }: { size: number }) => {
  return <Spinner size={size} />;
};

export const spinnerBg = () => {
  return <Spinner type='gg-spinner' />;
};
