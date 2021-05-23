import * as React from 'react';
import Header, { HeaderProps } from './Header';
import { RespImage } from '../../utils/RespImage';
import { Meta } from '@storybook/react/types-6-0';

export default {
  title: 'Components/Header',
  component: Header
} as Meta;

const DUMMY_IMG_URL = 'https://cdn.worldvectorlogo.com/logos/react.svg';
export const basic = (args: HeaderProps): React.ReactElement => {
  return <Header {...args} />;
};

basic.args = {
  title: 'Main Header',
  logo: <RespImage imageUrl={DUMMY_IMG_URL} />,
  themeToggle: true,
  links: [
    {
      title: 'Homepage',
      path: '/',
      isExternal: false
    },
    {
      title: 'News',
      path: '/news/',
      isExternal: false
    }
  ]
};
