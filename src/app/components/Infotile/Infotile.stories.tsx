import * as React from 'react';

import Infotile, { InfotileProps } from './Infotile';
import Input from '../../elements/Input';

export default {
  title: 'Elements/Infotile',
  component: Infotile
};

const data = {
  title: 'Title',
  titleSecondary: 'TitleSecondary',
  subTitle: 'SubTitle',
  link: { title: 'Primary' },
  linkSecondary: { title: 'Secondary' },
  description:
    'Main description. An entire React element can also be positioned here. Useful as RichText.'
};

export const basic = (args: InfotileProps): React.ReactChild => {
  return <Infotile {...args} />;
};

export const extensions = (): React.ReactChild => {
  return (
    <Infotile
      description={
        <div>
          Why not sign up for our newsletter? Keep up to date with our latest
          news.
          <br />
          <br />
          <Input
            style={{ maxWidth: 400 }}
            type='email'
            label='Your Email'
            name='email'
            required
          />
          <Input
            type='checkbox'
            label='I accept I am over the age of 16'
            name='age'
            required
          />
        </div>
      }
      link={{
        title: 'Proceed'
      }}
      linkSecondary={{
        title: 'Cancel'
      }}
      subTitle='Newsletter'
      title='Signup'
      titleSecondary='Now!'
    >
      <br />
      <small>
        I agree to the <a href='#'>Terms and Conditions</a>
      </small>
    </Infotile>
  );
};

basic.args = data;
