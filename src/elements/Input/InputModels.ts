import { FormEvent } from 'react';

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

export interface InputMaskProps {
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
   */
  mask?: string | Array<string | RegExp>;
}

/**
 * Specifies the main error type used within forms and inputs
 */
export interface ErrorGroup {
  error: boolean;
  errorText?: string;
}

export interface DefaultProps {
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

export interface ErrorProps {
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
  setValidity?: (e: any) => ErrorGroup;
}

export type VisualProps = {
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

export type moreprops = {
  noe?: 'primary' | 'inverse' | 'invisible';
  title?: string;
  appearance?: 'primary' | 'inverse' | 'invisible';
  fs?: 'primary' | 'inverse' | 'invisible';
};
