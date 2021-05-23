import * as React from 'react';
import { useEffect, useState } from 'react';
import Form, { FormDataType, FormProps } from './Form';
import Input, { ErrorGroup, InputType } from '../../elements/Input/Input';
import { delay } from '../../utils/helpers';
import { StoryTableBox, StoryTableItem } from '../../stories/Dummies';

export default {
  title: 'Components/Form',
  parameters: {
    componentSubtitle: 'Container'
  },
  component: Form
};

export const basic = (args: FormProps): React.ReactChild => {
  return (
    <StoryTableBox>
      <StoryTableItem title='Simple' description='Try adding invalid emails'>
        <Form
          {...args}
          onSubmit={(data: object) => {
            console.log('Payload Data:', data);
            return delay(500);
          }}
          footnote={<span>{args.footnote}</span>}
        >
          <Input
            label='Your name'
            type={InputType.text}
            name='name'
            required
            requiredError='Name cannot be empty'
          />
          <Input
            label='Your email'
            type={InputType.email}
            name='email'
            requiredError='Email cannot be empty'
            invalidError='Email is not correctly formatted'
            required
          />
        </Form>
      </StoryTableItem>
    </StoryTableBox>
  );
};

basic.args = {
  submitButton: {
    title: 'Submit'
  },
  footnote: 'By registering, you agree to our terms and conditions.'
};
basic.story = {
  parameters: {
    jest: ['Form.spec.tsx']
  }
};

export const FormErrors = (): React.ReactChild => {
  return (
    <StoryTableBox>
      <StoryTableItem
        title='Error on Form'
        description='This simulates error before and after request.
                Email error happens on the frontend and name error happens on the backend.'
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

export const InputErrorsPreFetch: React.FC = () => {
  return (
    <StoryTableBox>
      <StoryTableItem
        title='Error on Input'
        description='The values are auto-filled from server after 1 second. This simulates error before and after request. Card format is validated on the frontend and further validation is received from the Backend.'
      >
        <InputErrorsComp autofill />
      </StoryTableItem>
    </StoryTableBox>
  );
};

const InputErrorsComp = ({ autofill }: { autofill?: boolean }) => {
  const ref = React.useRef();
  const [cardError, setCardError]: [ErrorGroup, any] = useState({
    error: false,
    errorText: undefined
  });
  const [emailValue, setEmailValue] = useState<string | undefined>(undefined);
  const [inputData, setInputData] = useState<FormDataType>({});
  useEffect(() => {
    if (autofill) {
      setTimeout(() => {
        setEmailValue('11 1221 212');
      }, 1000);
    }
  }, []);
  return (
    <Form
      forwardRef={ref}
      submitButton={{
        title: 'Register',
        disabled: Object.keys(inputData).length === 0
      }}
      // @ts-ignore
      onChange={(data, e) => {
        console.log(data, 'data');
        console.log(e.currentTarget, 'Form change');
        setInputData(data);
      }}
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
        required
        invalidError='Invalid Email'
      />
      <Input
        label='Card number'
        type={InputType.text}
        mask='11 #### ####'
        value={emailValue}
        name='card'
        error={cardError}
        setValidity={(val) => {
          return (
            (val as string).length > 0 &&
            (val as string).length !== '11 9999 9999'.length
          );
        }}
        invalidError='Invalid card number'
        requiredError='Cannot be empty'
      />
    </Form>
  );
};
