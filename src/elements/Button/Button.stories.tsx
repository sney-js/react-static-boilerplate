import React from 'react';
import Button from './Button';
import {
  boolean,
  radios,
  select,
  text,
  withKnobs
} from '@storybook/addon-knobs';
import { IcMenu } from '../SvgElements';

export default {
  title: 'Elements/Button',
  parameters: {
    componentSubtitle: 'Atom'
  },
  component: Button,
  decorators: [withKnobs]
};

export const basic = () => {
  const title = text('Text', 'Button');
  const appearance = radios(
    'Appearance',
    { Primary: 'primary', Secondary: 'secondary' },
    undefined
  );
  const theme = radios('Theme', { Dark: 'dark', Light: 'light' }, 'None');
  const loading = boolean('Show Loading', false);
  const disabled = boolean('Disabled', false);
  const icon = select(
    'With Icon',
    { none: undefined, IconMenu: '<IcMenu />' },
    undefined
  );
  return (
    <div>
      <Button
        appearance={appearance}
        title={title}
        data-theme={theme}
        isLoading={loading}
        disabled={disabled}
        icon={icon && <IcMenu />}
      />
    </div>
  );
};
export const Appearances = () => {
  const isLoading = boolean('Loading', false);
  return (
    <div>
      <div>
        <Button appearance='primary' title='Primary' isLoading={isLoading} />
        <Button
          appearance='secondary'
          title='Secondary'
          isLoading={isLoading}
        />
        <Button
          appearance='primary'
          title='Primary Disabled'
          disabled
          isLoading={isLoading}
        />
        <Button
          appearance='secondary'
          title='Secondary Disabled'
          disabled
          isLoading={isLoading}
        />
      </div>
      <div data-theme='dark' className='background-Primary'>
        <Button appearance='primary' title='Primary' isLoading={isLoading} />
        <Button
          appearance='secondary'
          title='Secondary'
          isLoading={isLoading}
        />
        <Button
          appearance='primary'
          title='Primary Disabled'
          disabled
          isLoading={isLoading}
        />
        <Button
          appearance='secondary'
          title='Secondary Disabled'
          disabled
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export const WithIcons = () => {
  return (
    <div>
      <Button appearance='primary' icon={<IcMenu />} />
      <Button appearance='secondary' icon={<IcMenu />} />
      <Button
        appearance='primary'
        data-theme='dark'
        icon={<IcMenu />}
        title=''
      />
      <Button appearance='secondary' data-theme='dark' icon={<IcMenu />} />
      <br />
      <Button appearance='primary' icon={<IcMenu />} title='With Text' />
      <Button appearance='secondary' icon={<IcMenu />} title='With Text' />
      <Button
        appearance='primary'
        data-theme='dark'
        icon={<IcMenu />}
        title='With Text'
      />
      <Button
        appearance='secondary'
        data-theme='dark'
        icon={<IcMenu />}
        title='With Text'
      />
      <br />
    </div>
  );
};
