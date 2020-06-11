import React, { FormEvent } from 'react';
import InputMask from 'react-input-mask';
import { FormState, FormValidationContext } from 'components/Form/Form';
import { makeClass } from 'utils/Helpers';

type InputStateType = {
  error?: ErrorGroup;
  value?: InputProps['value'];
  propError?: ErrorGroup;
};

export enum InputType {
  text = 'text',
  textarea = 'textarea',
  number = 'number',
  email = 'email',
  password = 'password',
  splitText = 'splitText',
  checkbox = 'checkbox',
  toggle = 'toggle'
}

interface InputMaskProps {
  /**
   * When used with type=`splitText`, determines the input format.
   * e.g. XY99 9999 to allow `XY## ###` values.
   * <br/>
   * `9`: `0-9`
   * <br/>
   * `a`: `A-Z, a-z`
   * <br/>
   * `*`: `A-Z, a-z, 0-9`
   * <br/>
   * It is advised to also pass the `pattern` props with the appropriate
   * regex so invalid errors can be handled appropriately
   */
  mask?: string | Array<string | RegExp>;
}

/**
 * Specifies the main error type used within forms and inputs
 */
interface ErrorGroup {
  error: boolean;
  errorText?: string;
}

interface DefaultProps {
  type: InputType;
  /**
   * The name attrribute of the input
   */
  name: string;
  /**
   * Determines the main placeholder and label
   */
  label: string;
  /**
   * The default pre-populated value of the input
   */
  id?: string;
  /**
   * Must be one of the supported input types:
   */
  value?: string;
  /**
   * Appears below the input
   */
  description?: string;
}

interface ErrorProps {
  /**
   * The error thrown when a required input has been left empty
   */
  emptyError?: string;
  /**
   * The error thrown when the input is not in the correct format.
   * e.g. an email input with invalid email value.
   */

  invalidError?: string;
  /**
   * Programatically set error on input with this.
   * e.g. the form returns result back with error on this input.
   */
  error?: ErrorGroup;
  /**
   * Called when the input value is invalid
   */
  onInvalid?: (event: FormEvent<any>) => void;
  /**
   * Programatically set validity of input on change.
   */
  setValidity?: (e: any) => boolean;
}

type VisualProps = {
  /**
   * An element to be placed on the end of input. This is clickable.
   */
  icon?: JSX.Element;
  /**
   * Click event for icons
   * @param val
   */
  onIconClick?: (val?: string) => void;
};

export type InputProps = DefaultProps &
  ErrorProps &
  InputMaskProps &
  VisualProps &
  React.InputHTMLAttributes<any>;

class Input extends React.Component<InputProps, InputStateType> {
  static contextType = FormValidationContext;

  public state = {
    error: this.props.error,
    value: this.props.value,
    propError: this.props.error
  };

  private inputObj: React.RefObject<any>;

  constructor(props: any) {
    super(props);
    this.inputObj = React.createRef();
  }

  /**
   * Allows input to accept new props but then modify it internally using states
   * @param nextProps
   * @param prevState
   */
  static getDerivedStateFromProps(
    nextProps: any,
    prevState: any
  ): InputStateType {
    if (nextProps.error !== prevState.propError) {
      return { propError: nextProps.error, error: nextProps.error };
    }
    // If value is provided initially, allow users to edit them
    if (
      nextProps.value &&
      prevState.value === undefined &&
      nextProps.value !== prevState.value
    ) {
      return { value: nextProps.value };
    }
    return {};
  }

  /**
   *
   * @param e
   */
  onInvalid(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    e.preventDefault();
    const value = this.state.value;
    this.setInvalid({
      error: true,
      errorText:
        (this.state.error && this.state.error.errorText) ||
        (!this.checkEmptyValidity(value) && this.props.emptyError) ||
        (this.state.error && this.props.invalidError)
    });
    this.props.onInvalid && this.props.onInvalid(e);
  }

  onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const target = e.target;
    const value = target.value;
    const errorItem: ErrorGroup = { error: false, errorText: undefined };

    // backspace to nothing should show error again
    if (!this.checkEmptyValidity(value)) {
      errorItem.error = true;
      errorItem.errorText = this.props.emptyError;
    }

    if (!errorItem.error) {
      target.setCustomValidity('');
    }

    if (this.props.setValidity) {
      const isValid = this.props.setValidity(value);
      if (isValid) {
        target.setCustomValidity('Error');
      }
    }
    this.setInvalid(errorItem);
    this.setState({ value });
  }

  onIconClick(): void {
    this.props.onIconClick && this.props.onIconClick(this.state.value);
  }

  componentDidUpdate(): void {
    // const hasError = this.state.error && this.state.error.error;
    // this.sendInputInValid(Boolean(hasError));
  }

  componentDidMount(): void {
    const initialValidity = this.checkEmptyValidity(this.props.value);
    this.sendInputInValid(!initialValidity);
  }

  render(): React.ReactNode {
    const {
      name,
      error,
      value,
      label,
      emptyError,
      invalidError,
      description,
      mask,
      icon,
      setValidity,
      onIconClick,
      ...rest
    } = this.props;
    if (this.props.type === InputType.splitText && this.props.mask) {
      return (
        <InputFieldGroup
          {...this.props}
          error={this.state.error}
          onIconClick={this.onIconClick.bind(this)}
        >
          <InputMask
            {...rest}
            type='text'
            name={this.props.name}
            id={this.props.name}
            ref={this.inputObj}
            placeholder={this.props.placeholder || ' '}
            mask={this.props.mask}
            maskChar=''
            value={this.state.value}
            onChange={this.onChange.bind(this)}
            onInvalid={this.onInvalid.bind(this)}
          />
        </InputFieldGroup>
      );
    } else if (this.props.type === InputType.checkbox) {
      return (
        <InputFieldGroup
          {...this.props}
          error={this.state.error}
          onIconClick={this.onIconClick.bind(this)}
          label=''
        >
          <div className='switch-checkbox-root'>
            <label className='switch'>
              {this.props.label}
              <input
                {...rest}
                type='checkbox'
                id={this.props.name}
                name={this.props.name}
                onChange={this.onChange.bind(this)}
                onInvalid={this.onInvalid.bind(this)}
              />
              <span className='slider round' />
            </label>
          </div>
        </InputFieldGroup>
      );
    } else if (this.props.type === InputType.toggle) {
      return (
        <InputFieldGroup
          {...this.props}
          error={this.state.error}
          onIconClick={this.onIconClick.bind(this)}
          label=''
        >
          <div className='switch-toggle-root'>
            <label className='switch'>
              {this.props.label}
              <input
                {...rest}
                type='checkbox'
                id={this.props.name}
                name={this.props.name}
                onChange={this.onChange.bind(this)}
                onInvalid={this.onInvalid.bind(this)}
              />
              <span className='slider round' />
            </label>
          </div>
        </InputFieldGroup>
      );
    } else if (this.props.type === InputType.textarea) {
      return (
        <InputFieldGroup
          {...this.props}
          error={this.state.error}
          onIconClick={this.onIconClick.bind(this)}
        >
          <textarea
            {...rest}
            id={this.props.name}
            name={this.props.name}
            onChange={this.onChange.bind(this)}
            onInvalid={this.onInvalid.bind(this)}
          />
        </InputFieldGroup>
      );
    } else {
      return (
        <InputFieldGroup
          {...this.props}
          error={this.state.error}
          onIconClick={this.onIconClick.bind(this)}
        >
          <input
            ref={this.inputObj}
            placeholder={this.props.placeholder || ' '}
            onChange={this.onChange.bind(this)}
            value={this.state.value}
            id={this.props.name}
            name={this.props.name}
            {...rest}
            onInvalid={this.onInvalid.bind(this)}
          />
        </InputFieldGroup>
      );
    }
  }

  private checkEmptyValidity(value?: string): boolean {
    const hasValue = value && value.replace(/-/gi, '').trim().length !== 0;
    const isRequired = this.props.required;
    const isValid = !isRequired || (isRequired && hasValue);
    return !!isValid;
  }

  private setInvalid(errorItem: ErrorGroup): void {
    this.sendInputInValid(errorItem.error);
    this.setState({ error: errorItem });
  }

  private sendInputInValid = (hasError: boolean): void => {
    const formValidation = this.getFormContext();
    if (formValidation.setInputValidity) {
      formValidation.setInputValidity(this.props.name, hasError);
    }
  };

  private getFormContext(): FormState {
    return this.context as FormState;
  }
}

function InputFieldGroup(props: InputProps): JSX.Element {
  const hasError = props.error?.error;

  const classNamesList = makeClass([
    'field',
    props.type && `input-${props.type}`,
    hasError && 'error error-input-anim',
    props.disabled && 'input-disabled',
    props.icon && 'input-has-icon'
  ]);

  return (
    <div className={classNamesList}>
      {props.icon ? (
        <span
          className='input-icon'
          onClick={(): void => {
            props.onIconClick && props.onIconClick(props.value);
          }}
        >
          {props.icon}
        </span>
      ) : null}
      <div className={'field-description ' + props.type}>
        <div className='tiny'>{props.description}</div>

        {hasError && (
          <div className='error-root'>
            <small className='error'>
              {props.error?.errorText || props.invalidError}
            </small>
          </div>
        )}
      </div>

      {props.children}

      {props.label.length > 0 && (
        <label htmlFor={props.name}>{props.label}</label>
      )}
    </div>
  );
}

export default Input;
