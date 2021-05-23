import React from 'react';
import Button, { ButtonProps } from './Button';
import { IcMenu } from '../SvgElements';
import { Meta } from '@storybook/react/types-6-0';

export default {
  title: 'Elements/Button',
  component: Button,
  parameters: {
    componentSubtitle: 'Atom'
  }
} as Meta;

export const basic = (args: ButtonProps): React.ReactChild => (
  <Button {...args} />
);
basic.args = {
  title: 'Button'
};

const DisabledThemed = function (args: any): JSX.Element {
  return (
    <div style={{ padding: 'var(--spacing-gap-xs)' }}>
      <div>
        <Button appearance='primary' title='Primary' {...args} />
        <Button appearance='secondary' title='Secondary' {...args} />
        <Button appearance='invisible' title='Invisible' {...args} />
        <Button
          appearance='primary'
          title='Primary Disabled'
          disabled
          {...args}
        />
        <Button
          appearance='secondary'
          title='Secondary Disabled'
          disabled
          {...args}
        />
        <Button
          appearance='invisible'
          title='Invisible Disabled'
          disabled
          {...args}
        />
      </div>
      <div data-theme='dark' className='background-Primary'>
        <Button appearance='primary' title='Primary' {...args} />
        <Button appearance='secondary' title='Secondary' {...args} />
        <Button appearance='invisible' title='Invisible' {...args} />
        <Button
          appearance='primary'
          title='Primary Disabled'
          disabled
          {...args}
        />
        <Button
          appearance='secondary'
          title='Secondary Disabled'
          disabled
          {...args}
        />
        <Button
          appearance='invisible'
          title='Invisible Disabled'
          disabled
          {...args}
        />
      </div>
    </div>
  );
};

export const Appearances = (args: ButtonProps): JSX.Element => {
  return (
    <div>
      <DisabledThemed />
      <hr />
      <DisabledThemed isLoading />
      <hr />
      <DisabledThemed icon={<IcMenu />} />
      <hr />
      <DisabledThemed icon={<IcMenu />} title={undefined} />
    </div>
  );
};
