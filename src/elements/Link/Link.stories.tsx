import React from 'react';
import Link from './Link';
import { text, withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Elements/Link',
  parameters: {
    componentSubtitle: 'Atom'
  },
  component: Link,
  decorators: [withKnobs]
};

export const basic = () => {
  const to = text('Href', '#');
  const title = text('Text', '');
  return (
    <div>
      <Link to={to || 'https://bpmerewards.co.uk/'}>{title || 'Link'}</Link>
      <br />
      <Link title={title || 'Primary'} to={to || '#'} appearance='primary' />
      <Link
        title={title || 'Secondary'}
        to={to}
        newTab
        appearance='secondary'
      />
      <Link
        title={title || 'Disabled(Primary)'}
        to={to}
        appearance='primary'
        disabled
      />
      <Link
        title={title || 'Disabled(Secondary)'}
        to={to}
        appearance='secondary'
        disabled
      />
      <br />
      <Link
        title={title || 'Primary'}
        to={to || '#'}
        appearance='primary'
        data-theme='dark'
      />
      <Link
        title={title || 'Secondary'}
        to={to}
        appearance='secondary'
        data-theme='dark'
      />
      <Link
        title={title || 'Disabled(Primary)'}
        to={to}
        appearance='primary'
        disabled
        data-theme='dark'
      />
      <Link
        title={title || 'Disabled(Secondary)'}
        to={to}
        appearance='secondary'
        disabled
        data-theme='dark'
      />
    </div>
  );
};
