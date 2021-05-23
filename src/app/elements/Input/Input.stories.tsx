import * as React from 'react';
import { FormEvent } from 'react';
import Input, { InputProps } from './Input';
import { IcChevronDown, IcDanger } from '../../elements/SvgElements';
import { action } from '@storybook/addon-actions';

import CustomInput from './CustomInput';
import { INPUT_EXAMPLE_PROPS } from './InputStoriesHelper';
import Form from '../../components/Form';
import { delay } from '../../utils/helpers';
import { StoryTableBox, StoryTableItem } from '../../stories/Dummies';

export default {
  title: 'Elements/Inputs',
  parameters: {
    componentSubtitle: 'Form'
  },
  component: Input
};

export const basic = (args: InputProps): React.ReactChild => {
  const ref = React.useRef();
  return (
    <div style={{ padding: 'var(--spacing-gap-m)', maxWidth: 500 }}>
      <Form
        onSubmit={(data: object) => {
          console.log('Payload Data:', data);
          return delay(500);
        }}
      >
        <Input
          {...args}
          forwardRef={ref}
          setValidity={(val) => {
            console.log('SetValidity called with value: ', val);
            return args.setValidity as unknown as boolean;
          }}
          onIconClick={(val) =>
            console.log('OnIconClick called with value: ', val)
          }
          onInvalid={(val: FormEvent<any>) =>
            console.log('OnInvalid called with event target: ', val.target)
          }
        />
      </Form>
    </div>
  );
};
basic.args = {
  type: 'text',
  label: 'Name',
  name: 'testInput',
  description:
    'Description appears at the bottom of the input. Use this to give users more information',
  required: false,
  requiredError: 'This value is required',
  error: {
    error: false,
    errorText: 'Custom Error 1'
  },
  invalidError: 'Invalid Value'
} as InputProps;

export const All = (): React.ReactChild => {
  return (
    <Form
      aria-autocomplete='none'
      onSubmit={(data: object) => {
        action('data', data);
        return delay();
      }}
      style={{ paddingTop: 'var(--spacing-gap-m)' }}
    >
      <StoryTableBox>
        {Object.keys(INPUT_EXAMPLE_PROPS).map((e, i) => (
          <StoryTableItem key={i} title={e}>
            <Input
              {...INPUT_EXAMPLE_PROPS[e]}
              type={e}
              label={INPUT_EXAMPLE_PROPS[e].label}
              name={`all-${INPUT_EXAMPLE_PROPS[e].name}-${i}`}
            />
          </StoryTableItem>
        ))}
      </StoryTableBox>
    </Form>
  );
};

All.story = {
  parameters: {
    jest: ['Input.spec.tsx']
  }
};

export const Custom = (): React.ReactChild => {
  return (
    <Form
      onSubmit={(data: any) => {
        console.log(data);
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
          <tr>
            <td>
              <h5>Custom</h5>
            </td>
            <td>
              <Input
                type='date'
                label='datetime label'
                name='date'
                invalidError='asd'
                max='2020-12-31'
              />
              <Input
                type='text'
                label='text label'
                name='texts'
                icon={<IcDanger />}
              />
              <CustomInput
                label='card'
                type='select'
                name='cars'
                required
                icon={<IcChevronDown />}
                requiredError='No empty'
              >
                <select>
                  <option value='' disabled selected>
                    Please select
                  </option>
                  <option value='volvo'>Volvo</option>
                  <option value='saab'>Saab</option>
                  <option value='fiat'>Fiat</option>
                  <option value='audi'>Audi</option>
                </select>
              </CustomInput>
              <Input
                label='card'
                type='select'
                name='cars'
                required
                icon={<IcChevronDown />}
                requiredError='No empty'
              >
                <select>
                  <option value='' disabled selected>
                    Please select
                  </option>
                  <option value='volvo'>Volvo</option>
                  <option value='saab'>Saab</option>
                  <option value='fiat'>Fiat</option>
                  <option value='audi'>Audi</option>
                </select>
              </Input>
              <CustomInput
                label='car name'
                type='email'
                name='carsname'
                requiredError='no empty'
              >
                <input type='text' />
              </CustomInput>
              <Input
                type='checkbox'
                name='ccheck'
                label='car 1'
                defaultChecked={true}
              />
              <Input
                type='radio'
                name='cc'
                label='car 2'
                value='b'
                defaultChecked
              />
              <Input type='radio' name='cc' label='car 3' value='c' />
              <Input
                type='radioDefault'
                name='cc'
                label='car invisible'
                value='ææ'
              />
              <Input
                type='range'
                name='range'
                description='Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.'
                invalidError='Range too low'
                setValidity={(val) => {
                  console.log(val);
                  return ((val as number) | 0) > 50;
                }}
                label='range'
                value='134'
              />
            </td>
          </tr>
        </tbody>
      </table>
    </Form>
  );
};
