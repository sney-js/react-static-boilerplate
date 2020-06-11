import * as React from 'react';
import Button from './Button';
import { shallow } from 'enzyme';

describe('<Button />', () => {
  test('Basic', () => {
    const result = shallow(<Button title='no' />);
    expect(result.text()).toBe('no');

    const button = result.find('button');
    expect(button.type()).toBe('button');

    expect(result.html()).toMatchSnapshot();
  });

  test('Title as children', () => {
    const result = shallow(<Button>no</Button>);
    expect(result.text()).toBe('no');

    const button = result.find('button');
    expect(button.type()).toBe('button');
  });

  test('Appearance', () => {
    const result = shallow(
      <Button appearance='secondary' title='Secondary' />
    );

    const instance = result.find('button');
    expect(instance.props().className).toContain('secondary');

    expect(result).toMatchSnapshot();
  });
});
