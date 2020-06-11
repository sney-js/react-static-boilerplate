import * as React from 'react';
import { useState } from 'react';
import Form from './Form';
import { text, withKnobs } from '@storybook/addon-knobs';
import { StoryTableBox, StoryTableItem } from 'stories/components/Dummies';
import Input, { InputType } from 'elements/Input/Input';
import { delay } from 'stories/utils';
import { ErrorGroup } from 'elements/Input/InputModels';

export default {
  title: 'Components/Form',
  parameters: {
    componentSubtitle: 'Container'
  },
  component: Form,
  decorators: [withKnobs]
};

export const basic = () => {
  return (
    <StoryTableBox>
      <StoryTableItem title='Simple' description='Try adding invalid emails.'>
        <Form
          footnote={
            <span>{text('Form:Footnote', 'This is my form footnote.')}</span>
          }
          onSubmit={(json: object): Promise<void> => {
            console.log(json);
            return delay();
          }}
        >
          <Input
            label='Your name'
            type={InputType.text}
            name='name'
            required
            emptyError='Name cannot be empty'
          />
          <Input
            label='Your email'
            type={InputType.email}
            name='email'
            emptyError={text('Email: Empty', 'Email cannot be empty')}
            invalidError={text(
              'Email: Invalid',
              'Email is not correctly formatted'
            )}
            required
          />
        </Form>
      </StoryTableItem>
    </StoryTableBox>
  );
};

export const FormErrors = () => {
  return (
    <StoryTableBox>
      <StoryTableItem
        title='Error on Form'
        description='This simulates error before and after request. Email error happens on the frontend and name error happens on the backend.'
      >
        <Form
          onSubmit={(json: any): Promise<void> => {
            if ((json.email as string).indexOf('@domain.com') === -1) {
              return Promise.reject(
                Error('Please make sure your email ends with @domain.com')
              );
            }
            return delay().then(() => {
              if (!(json.name as string).length) {
                throw Error('Hmmm still no good. Try adding a name!');
              }
            });
          }}
        >
          <Input label='Your name' type={InputType.text} name='name' />
          <Input
            label='Your email'
            type={InputType.email}
            name='email'
            invalidError='Invalid Email'
          />
        </Form>
      </StoryTableItem>
    </StoryTableBox>
  );
};

export const InputErrors: React.FC = () => {
  return (
    <StoryTableBox>
      <StoryTableItem
        title='Error on Input'
        description='This simulates error before and after request. Card format is validated on the frontend and further validation is received from the Backend.'
      >
        <InputErrorsComp />
      </StoryTableItem>
    </StoryTableBox>
  );
};

const InputErrorsComp: React.FC = () => {
  const [cardError, setCardError]: [ErrorGroup, any] = useState({
    error: false,
    errorText: undefined
  });
  return (
    <Form
      onInvalid={(inputsValid?: any): void => {
        console.log('Invalid Form inputs:', inputsValid);
      }}
      onSubmit={(): Promise<void> => {
        return delay().then(() => {
          setCardError({
            error: true,
            errorText: 'Server says this card number does not exist'
          });
          return Promise.reject(Error());
        });
      }}
    >
      <Input
        label='Your email'
        type={InputType.email}
        name='email'
        invalidError='Invalid Email'
      />
      <Input
        label='Card number'
        type={InputType.splitText}
        mask='11 9999 9999'
        name='card'
        required
        error={cardError}
        setValidity={(val) => {
          return val.length > 0 && val.length !== '11 9999 9999'.length;
        }}
        invalidError='Invalid card number'
        emptyError='Cannot be empty'
      />
    </Form>
  );
};
