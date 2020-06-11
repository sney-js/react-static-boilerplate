import * as React from 'react';
import Input from './Input';
import { withKnobs } from '@storybook/addon-knobs';
import Form from 'components/Form';
import { IcLock, IcDanger } from 'elements/SvgElements';
import { action } from '@storybook/addon-actions';
import { InputType } from './InputModels';
import {
  StoryTableBox,
  StoryTableItem
} from '../../stories/components/Dummies';

export default {
  title: 'Elements/Inputs',
  parameters: {
    componentSubtitle: 'Form'
  },
  component: Input,
  decorators: [withKnobs]
};

const defValues = {
  text: { value: undefined, type: 'text', name: 'name', label: 'Your name' },
  textarea: {
    name: 'description',
    label: 'Your description',
    value:
      'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.'
  },
  number: {
    value: '12',
    name: 'age',
    label: 'Your Age'
  },
  email: {
    value: 'myemail@domain.com',
    name: 'email',
    label: 'Your Email'
  },
  password: {
    value: 'password123!',
    name: 'password',
    label: 'Your Password'
  },
  splitText: {
    value: 'EC1 4BR',
    name: 'postcode',
    label: 'Your postcode',
    mask: 'EC99 99R',
    pattern: 'EC[0-9]{2}\\s[0-9]{2}R',
    invalidError: 'Invalid yo'
  },
  checkbox: {
    value: 'true',
    name: 'description',
    label: 'Please Check'
  },
  toggle: {
    value: 'true',
    name: 'toggle',
    label: 'Please Toggle'
  }
};

const INPUT_FLOW = [
  {
    heading: 'Text'
  },
  {
    heading: 'Pre-populated',
    value: 'true'
  },
  {
    heading: 'With description',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.'
  },
  {
    heading: 'Disabled + Icon',
    icon: <IcLock />,
    disabled: true
  },
  {
    heading: 'Required + Icon',
    icon: <IcDanger />,
    iconState: 0,
    onIconClick: action('icon-click'),
    required: true
  },
  {
    heading: 'Required: Empty error',
    required: true,
    emptyError: 'Please input some text'
  },
  {
    heading: 'Invalid',
    required: true,
    invalidError: 'Input is invalid'
  },
  {
    heading: 'Error',
    error: { error: true, errorText: 'An error to begin with' }
  },
  {
    heading: 'Error + Description',
    error: { error: true, errorText: 'An error to begin with' },
    description: 'Lorem ipsum dolor sit amet, consectetur adipisici elit.'
  }
];

const InputStoryTemplate = (type: InputType) => {
  return (
    <Form
      onSubmit={() => {
        action('form-submit');
        return Promise.resolve();
      }}
    >
      <table
        style={{
          tableLayout: 'fixed'
        }}
      >
        <tbody>
          {INPUT_FLOW.map((e, i) => {
            const defValue = defValues[type];
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

export const All = () => {
  return (
    <Form>
      <StoryTableBox>
        {Object.keys(defValues).map((e, i) => (
          <StoryTableItem key={i} title={e}>
            <Input
              type={e}
              label={defValues[e].label}
              name={`all-${defValues[e].name}-${i}`}
              {...defValues[e]}
            />
          </StoryTableItem>
        ))}
      </StoryTableBox>
    </Form>
  );
};

export const Text = () => InputStoryTemplate(InputType.text);
export const Email = () => InputStoryTemplate(InputType.email);
export const Password = () => InputStoryTemplate(InputType.password);
export const Number = () => InputStoryTemplate(InputType.number);
export const FormattedText = () => InputStoryTemplate(InputType.splitText);
export const TextArea = () => InputStoryTemplate(InputType.textarea);
export const CheckBox = () => InputStoryTemplate(InputType.checkbox);
export const Toggle = () => InputStoryTemplate(InputType.toggle);
