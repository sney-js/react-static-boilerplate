import Input, { InputFieldGroup } from './Input';
import * as React from 'react';

class CustomInput extends Input {
  public state = { ...super.state };

  render(): React.ReactNode {
    const { children, ...rest } = this.props;
    const element = React.Children.only(children);
    return (
      <InputFieldGroup {...this.extractFieldProps(rest)}>
        {element &&
          React.cloneElement(element, { ...this.extractInputProps(rest) })}
      </InputFieldGroup>
    );
  }
}

export default CustomInput;
