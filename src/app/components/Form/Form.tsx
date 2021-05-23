import * as React from 'react';
import Button, { ButtonProps } from '../../elements/Button/Button';
import { FormEvent } from 'react';

export type FormDataType = {
  [key: string]: string | boolean | number | undefined;
};

export type FormProps = React.HTMLAttributes<HTMLFormElement> & {
  /**
   * Return a promise. While the promise is in progress,
   * a loader will be shown and the form will be disabled.
   * If an error is thrown, the string message in Error(mymsg) will be shown under the form.
   * @param data : data of inputs as a key value pair
   * @param e : e.target to get Form.
   * @return Promise<any>
   */
  onSubmit?: (
    data: FormDataType,
    e: FormEvent<HTMLFormElement>
  ) => Promise<any>;
  /**
   * Extends existing React's synthetic function onInvalid.
   * Prevents default and returns which inputs are invalid.
   * @param inputNames: {[inputName]: boolean}
   * (true means input with name inputName is invalid)
   */
  onInvalid?: (inputNames?: any) => void;
  /**
   * Returns the entire FormEvent.
   * Use `e.currentTarget` to get form and `e.target` to get changed input.
   * @param data: e.g. `{firstname:'John'}`. compiled data from all inputs.
   * @param e: FormEvent<HTMLInputElement>
   */
  onChange?: (data: FormDataType, e: FormEvent<HTMLFormElement>) => void;
  /**
   * Used to change submit button's text
   */
  submitButton?: ButtonProps;
  /**
   * Appears at the bottom of the form.
   */
  footnote?: JSX.Element;
  /**
   * Use this to obtain ref object of `<input>` element.
   */
  forwardRef?: React.RefObject<any>;
};

export type FormState = {
  inProgress: boolean;
  errorText?: string;
  formValid: boolean;
  inputsInvalid: object;
  setInputValidity: (name: string, valid: boolean) => void;
  submitCounter: number;
  clearAllInputsValidity: () => void;
};

export const FormValidationContext = React.createContext({
  inProgress: false,
  formValid: false,
  submitCounter: 0,
  inputsInvalid: {}
});

class Form extends React.Component<FormProps, FormState> {
  state = {
    inProgress: false,
    errorText: undefined,
    formValid: false,
    inputsInvalid: {},
    submitCounter: 0,
    showRequiredFields: true,
    setInputValidity: this.setInputValidity.bind(this),
    clearAllInputsValidity: this.clearAllInputsValidity.bind(this)
  };

  static defaultProps = {
    submitButton: {
      title: 'Submit',
      appearance: 'primary'
    }
  };

  /**
   * When there are series of forms, this can be used to
   * @param name
   * @param valid
   */
  setInputValidity(name: string, valid: boolean): void {
    if (!this.state) return;
    const inputs = this.state.inputsInvalid;
    if (inputs[name] !== valid) {
      inputs[name] = valid;
      const invalids = Object.keys(inputs).filter((e) => inputs[e] === true);
      this.setState({
        inputsInvalid: inputs,
        formValid: invalids.length === 0
      });
    }
  }

  clearAllInputsValidity(): void {
    this.setState({
      inputsInvalid: {},
      formValid: true
    });
  }

  render(): React.ReactNode {
    const errorText: string | undefined = this.state.errorText;
    const { footnote, forwardRef, submitButton, ...rest } = this.props;

    return (
      <form
        {...rest}
        ref={forwardRef}
        className={'d-form ' + (this.props.className || '')}
        onSubmit={(e: React.FormEvent<HTMLFormElement>): void => {
          e.preventDefault();
          // check if inputs are all valid first
          const allInputsValid = this.state.formValid;
          const isEmpty = Object.keys(this.state.inputsInvalid).length === 0;
          if (!isEmpty && !allInputsValid) {
            // console.log(
            //   'Error: All inputs are not valid!',
            //   this.state.inputsInvalid
            // );
            this.props.onInvalid &&
              this.props.onInvalid(this.state.inputsInvalid);
            this.setState({ submitCounter: this.state.submitCounter + 1 });
            return;
          }

          // convert formdata to json
          const jsonData = this.getJsonData(e.target as HTMLFormElement);

          this.setState({ inProgress: true });

          if (this.props.onSubmit) {
            this.props
              .onSubmit(jsonData, e)
              .then(() => {
                this.setState({ inProgress: false, errorText: undefined });
              })
              .catch((error: Error) => {
                this.setState({
                  inProgress: false,
                  errorText: error.message || '',
                  submitCounter: this.state.submitCounter + 1
                });
              });
          } else {
            this.setState({
              inProgress: false,
              submitCounter: this.state.submitCounter + 1
            });
          }
        }}
        onInvalid={(e): void => {
          e.preventDefault();
          this.setState({ submitCounter: this.state.submitCounter + 1 });
          this.props.onInvalid &&
            this.props.onInvalid(this.state.inputsInvalid);
        }}
        onChange={(e): void => {
          const jsonData = this.getJsonData(e.currentTarget as HTMLFormElement);
          this.props.onChange && this.props.onChange(jsonData, e);
        }}
      >
        <FormValidationContext.Provider value={this.state}>
          <div className='d-form__inputs-root'>{this.props.children}</div>

          <div className='d-form__lower-root'>
            {errorText && !this.state.inProgress ? (
              <div className='d-form__error-box'>
                <small>{errorText}</small>
              </div>
            ) : null}

            {submitButton && (
              <Button
                type='submit'
                isLoading={this.state.inProgress}
                disabled={this.state.inProgress}
                {...submitButton}
              />
            )}
          </div>
          <div className='d-form__footnote'>
            {this.props.footnote && (
              <small>
                <br />
                {this.props.footnote}
              </small>
            )}
          </div>
        </FormValidationContext.Provider>
      </form>
    );
  }

  private getJsonData(form: HTMLFormElement): FormDataType {
    const formData = new window.FormData(form);
    const object = {};
    formData.forEach((value, key) => {
      value = (value as string).trim();
      if (object[key] !== undefined) object[key] += value;
      else object[key] = value;
      if (value === 'on' || value === 'off') {
        object[key] = value === 'on';
      }
    });
    form
      .querySelectorAll('input[type=checkbox]')
      .forEach((input: HTMLInputElement | any) => {
        object[input.name || 0] = input.checked;
      });
    return object;
  }
}

export default Form;
