import { InputProps } from './Input';

export const INPUT_EXAMPLE_PROPS: { [key: string]: InputProps } = {
  text: { value: 'Snehil B', type: 'text', name: 'name', label: 'Text' },
  number: {
    value: '12',
    type: 'number',
    name: 'age',
    label: 'Number'
  },
  email: {
    value: 'myemail@domain.com',
    type: 'email',
    name: 'email',
    label: 'Email'
  },
  password: {
    value: 'password123!',
    type: 'password',
    name: 'password',
    label: 'Password'
  },
  date: {
    value: '2011-09-29',
    type: 'date',
    name: 'date',
    label: 'Date'
  },
  textarea: {
    name: 'description',
    label: 'Textarea',
    type: 'textarea',
    value:
      'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.'
  },
  checkbox: {
    type: 'checkbox',
    name: 'description',
    required: true,
    requiredError: 'Please check this',
    label: 'Checkbox'
  },
  radio: {
    type: 'radio',
    name: 'description',
    label: 'Radio'
  },
  toggle: {
    type: 'toggle',
    name: 'toggle',
    label: 'Toggle'
  }
};
