import React, { FormEvent, ReactElement } from 'react';
import InputMask from 'react-input-mask';
import { FormState, FormValidationContext } from '../../components/Form/Form';
import { makeClass } from '../../utils/helpers';
import './Input.scss';

export const InputType = {
  text: 'text',
  textarea: 'textarea',
  number: 'number',
  email: 'email',
  password: 'password',
  checkbox: 'checkbox',
  toggle: 'toggle',
  radio: 'radio',
  checkboxDefault: 'checkboxDefault',
  radioDefault: 'radioDefault'
} as const;

/**
 * Specifies the main error type used within forms and inputs
 */
export interface ErrorGroup {
  error: boolean;
  errorText?: string;
}

type ValueTypes = string | boolean | number;
type SupportedHTMLInputs = HTMLInputElement;

export type InputProps = {
  type: string | keyof typeof InputType;
  /**
   * The name attribute of the input
   */
  name: string;
  /**
   * Determines the main placeholder and label
   */
  label: string;
  /**
   * If this input is required.
   */
  required?: boolean;
  /**
   * The error thrown when a required input has been left empty
   */
  requiredError?: string;
  /**
   * Must be one of the supported input types:
   */
  value?: string;
  /**
   * Select this to enable checkboxes and radio by default. To dynamically
   * check them, use `checked` as prop
   */
  defaultChecked?: boolean;
  /**
   * Appears below the input
   */
  description?: string | JSX.Element;
  /**
   * The error thrown when the input is not in the correct format.
   * e.g. an email input with invalid email value.
   */
  invalidError?: string;
  /**
   * Programatically set error on input with this. `{error: boolean, errorText: string}`
   * e.g. the form returns result back with error on this input.
   */
  error?: ErrorGroup;
  /**
   * An element to be placed on the end of input. This is clickable.
   */
  icon?: JSX.Element;
  /**
   * When used with text based input, determines the input format.
   * e.g. XY## #### to allow `XY12 345` values.
   * <br/>
   * `#`: `0-9`
   * <br/>
   * `&`: `A-Z, a-z`
   * <br/>
   * `*`: `A-Z, a-z, 0-9`
   * <br/>
   * It is advised to also pass the `pattern` props with the appropriate
   * regex so invalid errors can be handled appropriately
   */
  mask?: string | Array<string | RegExp>;
  /**
   * Called when the input value is invalid
   * @param event Default HTML FormEvent on onInvalid
   */
  onInvalid?: (event: FormEvent<any>) => void;
  /**
   * Programatically set validity of input on change.
   * @param value current value of the input
   * @return true if the input is invalid
   */
  setValidity?: (value?: string | boolean | number) => boolean;
  /**
   * Click event for icons
   * @param value current value of the input
   */
  onIconClick?: (value?: string | boolean | number) => void;
  /**
   * Use this to obtain ref object of `<input>` element.
   */
  forwardRef?: React.RefObject<any>;
  /**
   * Use this for custom input fields like `<select>`.
   */
  children?: ReactElement;
} & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

export type InputStateType = {
  error?: ErrorGroup;
  value?: ValueTypes;
  propError?: ErrorGroup;
};

class Input extends React.Component<InputProps, InputStateType> {
  static contextType = FormValidationContext;

  public state = {
    error: this.props.error,
    value: this.props.value,
    propError: this.props.error
  };

  inputObj: React.RefObject<any>;

  constructor(props: InputProps) {
    super(props);
    this.inputObj = props.forwardRef || React.createRef();
  }

  /**
   * Allows input to accept new props but then modify it internally using states
   * @param nextProps
   * @param prevState
   */
  static getDerivedStateFromProps(
    nextProps: InputProps,
    prevState: InputStateType
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

  onInvalid(e: React.FormEvent<SupportedHTMLInputs>): void {
    e.preventDefault();
    const { value } = this.state;
    this.setInvalid({
      error: true,
      errorText:
        (!this.checkEmptyValidity(value) && this.props.requiredError) ||
        (this.state.error && this.props.invalidError) ||
        (this.state.error && this.state.error.errorText)
    });
    this.props.onInvalid && this.props.onInvalid(e);
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { target } = e;
    const { value } = target;
    if (this.hasTypeCheckboxOrRadio().checkbox) {
      this.handleInputValueChange(target.checked, target);
    } else {
      this.handleInputValueChange(value, target);
    }
    this.props.onChange && this.props.onChange(e);
  }

  handleInputValueChange(
    value?: ValueTypes,
    target?: HTMLInputElement | any
  ): void {
    const errorItem: ErrorGroup = { error: false, errorText: undefined };
    // backspace to nothing should show error again
    if (!this.checkEmptyValidity(value)) {
      errorItem.error = true;
      errorItem.errorText = this.props.requiredError;
    }

    const inputTarget = target || this.inputObj.current;
    if (!errorItem.error && inputTarget) {
      inputTarget.setCustomValidity('');
    }

    if (this.props.setValidity) {
      const isValid = this.props.setValidity(value);
      if (isValid && inputTarget) {
        inputTarget.setCustomValidity('Error');
      }
    }
    this.setInvalid(errorItem);
    this.setState({ value });
  }

  onIconClick(): void {
    this.props.onIconClick && this.props.onIconClick(this.state.value);
  }

  componentDidMount(): void {
    const initialValidity = this.checkEmptyValidity(this.props.value);
    this.emitInputInvalid(!initialValidity);
  }

  componentDidUpdate(
    _prevProps: Readonly<InputProps>,
    _prevState: Readonly<InputStateType>
  ): void {
    if (_prevProps.value !== this.props.value) {
      this.handleInputValueChange(this.props.value);
    }
    // if error set is true, do not allow form submission
    if (_prevProps.error?.error !== this.props.error?.error) {
      this.emitInputInvalid(this.props.error?.error || false);
    }
  }

  extractInputProps(
    props: Readonly<InputProps> & Readonly<{ children?: React.ReactNode }>
  ): InputProps & any {
    const {
      error,
      value,
      label,
      requiredError,
      style,
      invalidError,
      description,
      mask,
      icon,
      forwardRef,
      setValidity,
      onChange,
      onInvalid,
      onIconClick,
      children,
      ...rest
    } = props;
    return {
      ...rest,
      ref: this.inputObj,
      onChange: this.onChange.bind(this),
      onInvalid: this.onInvalid.bind(this),
      value: this.state.value
    };
  }

  extractFieldProps(
    props: Readonly<InputProps> & Readonly<{ children?: React.ReactNode }>
  ): InputProps {
    return {
      ...props,
      error: this.state.error,
      onIconClick: this.onIconClick.bind(this)
    };
  }

  private hasTypeCheckboxOrRadio(): {
    all: boolean;
    checkbox: boolean;
    radio: boolean;
  } {
    const isCheckbox =
      this.props.type === InputType.checkbox ||
      this.props.type === InputType.toggle ||
      this.props.type === InputType.checkboxDefault;

    const isRadio =
      this.props.type === InputType.radio ||
      this.props.type === InputType.radioDefault;

    return {
      all: isCheckbox || isRadio,
      checkbox: isCheckbox,
      radio: isRadio
    };
  }

  checkEmptyValidity(value?: ValueTypes): boolean {
    const isRequired = this.props.required;
    let cleanedValue: string | undefined;
    let hasValue = false;

    if (typeof value === 'string') {
      cleanedValue = value?.trim() || '';
      hasValue = cleanedValue.length !== 0;
    } else if (typeof value === 'boolean') {
      hasValue = value;
    }

    const isValid: boolean = !isRequired || (isRequired && hasValue);
    return isValid;
  }

  setInvalid(errorItem: ErrorGroup): void {
    this.emitInputInvalid(errorItem.error);
    this.setState({ error: errorItem });
  }

  emitInputInvalid(hasError: boolean): void {
    const formValidation = this.getFormContext();
    if (formValidation.setInputValidity) {
      formValidation.setInputValidity(this.props.name, hasError);
    }
  }

  getFormContext(): FormState {
    return this.context as FormState;
  }

  render(): React.ReactNode {
    const inputProps = this.extractInputProps(this.props);
    const fieldProps = this.extractFieldProps(this.props);

    // -------------------------------CHILDREN---------------------------
    if (this.props.children) {
      return (
        <InputFieldGroup {...fieldProps}>
          {this.props.children &&
            React.cloneElement(this.props.children, { ...inputProps })}
        </InputFieldGroup>
      );
    }
    // -------------------------------SPLITTEXT---------------------------
    if (this.props.mask) {
      const { ref, ...inputPropsRest } = inputProps;
      return (
        <InputFieldGroup {...fieldProps}>
          <InputMask
            {...inputPropsRest}
            mask={this.props.mask}
            inputRef={ref}
            maskChar=''
            formatChars={{
              '#': '[0-9]',
              '&': '[A-Za-z]',
              '*': '[A-Za-z0-9]'
            }}
          />
        </InputFieldGroup>
      );
    }
    // -------------------------------CHECKBOX + RADIO---------------------------
    const checkBoxOrRadio = this.hasTypeCheckboxOrRadio();
    if (checkBoxOrRadio.checkbox) {
      delete inputProps.value;
    }

    if (checkBoxOrRadio.checkbox || checkBoxOrRadio.radio) {
      return (
        <InputFieldGroup {...fieldProps} label=''>
          <div className={makeClass([`switch-${this.props.type}-root`])}>
            <label className='switch'>
              {this.props.label}
              <input
                {...inputProps}
                type={checkBoxOrRadio.checkbox ? 'checkbox' : 'radio'}
              />
              <span className='slider round' />
            </label>
          </div>
        </InputFieldGroup>
      );
    }
    // -------------------------------TEXTAREA---------------------------
    if (this.props.type === InputType.textarea) {
      return (
        <InputFieldGroup {...fieldProps}>
          <textarea {...inputProps} />
        </InputFieldGroup>
      );
    }
    // -------------------------------TEXT, EMAIL, NUMBER, Others---------------------------
    return (
      <InputFieldGroup {...fieldProps}>
        <input {...inputProps} />
      </InputFieldGroup>
    );
  }
}

export function InputFieldGroup(props: InputProps): JSX.Element {
  const hasError = props.error?.error;

  const classNamesList = makeClass([
    'field',
    props.type && `input-${props.type}`,
    hasError && 'error error-input-anim',
    props.disabled && 'input-disabled',
    props.icon && 'input-has-icon'
  ]);

  return (
    <div className={classNamesList} style={props.style}>
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
      {(props.description || hasError) && (
        <div className='field-underinfo'>
          {props.description && (
            <small className='field-description'>{props.description}</small>
          )}

          {hasError && (
            <small className='field-error'>{props.error?.errorText}</small>
          )}
        </div>
      )}

      {props.children}

      {props.label.length > 0 && (
        <label className='field-label' htmlFor={props.name}>
          {props.label}
        </label>
      )}
    </div>
  );
}

export default Input;
