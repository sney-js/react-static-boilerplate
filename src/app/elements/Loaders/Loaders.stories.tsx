import React from 'react';
import Spinner from './Loaders';

export default {
  title: 'Elements/Loaders',
  parameters: {
    componentSubtitle: 'Atom'
  },
  component: Spinner
};

export const spinner = ({ size = 1 }: { size: number }): React.ReactChild => {
  return <Spinner size={size} />;
};

export const spinnerBg = (): React.ReactChild => {
  return <Spinner type='gg-spinner' />;
};
