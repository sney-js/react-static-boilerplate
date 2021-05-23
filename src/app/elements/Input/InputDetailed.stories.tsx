import * as React from 'react';
import Input, { InputProps, InputType } from './Input';
import { action } from '@storybook/addon-actions';
import { delay } from '../../utils/helpers';
import { INPUT_EXAMPLE_PROPS } from './InputStoriesHelper';
import { IcDanger, IcLock } from '../../elements/SvgElements';
import Form from '../../components/Form';

export default {
  title: 'Elements/Inputs/Detailed',
  parameters: {
    componentSubtitle: 'Form'
  },
  component: Input
};

const DETAIL_FLOW = [
  {
    heading: 'Text'
  },
  {
    heading: 'Placeholder',
    placeholder: 'Please enter a value'
  },
  {
    heading: 'Pre-populated',
    value: 'true'
  },
  {
    heading: 'Description + Icon',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.',
    icon: <IcDanger />,
    iconState: 0,
    onIconClick: action('icon-click')
  },
  {
    heading: 'Disabled + Icon',
    icon: <IcLock />,
    disabled: true
  },
  {
    heading: 'Error',
    error: { error: true, errorText: 'An error to begin with' }
  },
  {
    heading: 'Error + Description',
    error: { error: true, errorText: 'An error to begin with' },
    description: 'Lorem ipsum dolor sit amet, consectetur adipisici elit.'
  },
  {
    heading: 'Required',
    required: true,
    requiredError: 'Please input some text'
  },
  {
    heading: 'Invalid',
    invalidError: 'Input is invalid'
  }
];

const InputStoryTemplate = (type: InputProps['type'] | 'splitText') => {
  return (
    <Form
      onSubmit={() => {
        action('form-submit');
        return delay();
      }}
    >
      <table
        style={{
          tableLayout: 'fixed'
        }}
      >
        <tbody>
          {DETAIL_FLOW.map((e, i) => {
            const defValue = INPUT_EXAMPLE_PROPS[type];
            let { value, iconState, heading, ...rest } = e;
            value = e.value ? defValue.value : undefined;
            return (
              <tr key={i}>
                <td>
                  <h5>{e.heading}</h5>
                </td>
                <td>
                  <Input
                    {...defValue}
                    type={type}
                    label={defValue.label}
                    name={`${defValue.name}-${i}`}
                    {...rest}
                    value={value}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Form>
  );
};

export const Text = (): JSX.Element => InputStoryTemplate(InputType.text);
export const Email = (): JSX.Element => InputStoryTemplate(InputType.email);
export const Password = (): JSX.Element =>
  InputStoryTemplate(InputType.password);
export const Number = (): JSX.Element => InputStoryTemplate(InputType.number);
export const FormattedText = (): JSX.Element => InputStoryTemplate('splitText');
export const TextArea = (): JSX.Element =>
  InputStoryTemplate(InputType.textarea);
export const CheckBox = (): JSX.Element =>
  InputStoryTemplate(InputType.checkbox);
export const Radio = (): JSX.Element => InputStoryTemplate(InputType.radio);
export const Toggle = (): JSX.Element => InputStoryTemplate(InputType.toggle);
