import * as React from 'react';
import Button from 'elements/Button/Button';

export type FormProps = {
  /**
   * Return a promise. While the promise is in progress,
   * a loader will be shown and the form will be disabled.
   * If an error is thrown, the string message in Error(mymsg) will be shown under the form.
   * @param json : data of inputs as a json
   * @param e : e.target to get Form.
   * @return Promise<any>
   */
  onSubmit?: (
    json: object,
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<any>;
  /**
   * Extends existing React's synthetic function onInvalid.
   * Prevents default and returns which inputs are invalid.
   * @param inputNames: {[inputName]: boolean}
   * (true means input with name inputName is invalid)
   */
  onInvalid?: (inputNames?: any) => void;
  /**
   * Returns the input that has just been changed by the user.
   * @param e: HTMLInputElement
   */
  onChange?: (e: HTMLInputElement) => void;
  /**
   * Used to change submit button's text
   */
  submitButtonText?: string;
  /**
   * Appears at the bottom of the form.
   */
  footnote?: JSX.Element;
} & React.FormHTMLAttributes<any>;

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
    submitButtonText: 'Submit'
  };

  /**
   * When there are series of forms, this can be used to
   * @param name
   * @param valid
   */
  setInputValidity(name: string, valid: boolean): void {
    if (!this.state) return;
    const inputs = this.state.inputsInvalid;
    if (inputs[name] === valid) {
    } else {
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
    const { footnote, submitButtonText, ...rest } = this.props;

    return (
      <form
        {...rest}
        className={'form-component ' + (this.props.className || '')}
        onSubmit={(e: React.FormEvent<HTMLFormElement>): void => {
          e.preventDefault();
          // check if inputs are all valid first
          const allInputsValid = this.state.formValid;
          const isEmpty = Object.keys(this.state.inputsInvalid).length === 0;
          if (!isEmpty && !allInputsValid) {
            console.log(
              'Error: All inputs are not valid!',
              this.state.inputsInvalid
            );
            this.props.onInvalid &&
              this.props.onInvalid(this.state.inputsInvalid);
            this.setState({ submitCounter: this.state.submitCounter + 1 });
            return;
          }

          // convert formdata to json
          const jsonData = this.getJsonData(e.target);

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
          const input = e.target as HTMLInputElement;
          this.props.onChange && this.props.onChange(input);
        }}
      >
        <FormValidationContext.Provider value={this.state}>
          {this.props.children}

          {errorText && !this.state.inProgress ? (
            <div className='form-error-box'>
              <small>{errorText}</small>
            </div>
          ) : null}

          {this.props.submitButtonText !== null && (
            <Button
              type='submit'
              isLoading={this.state.inProgress}
              disabled={this.state.inProgress}
              title={this.props.submitButtonText}
            />
          )}
          <div>
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

  private getJsonData(form: any): object {
    const formData = new window.FormData(form);
    const object = {};
    formData.forEach((value, key) => {
      value = (value as string).trim();
      if (object[key] !== undefined) object[key] += value;
      else object[key] = value;
    });
    return object;
  }
}

export default Form;
