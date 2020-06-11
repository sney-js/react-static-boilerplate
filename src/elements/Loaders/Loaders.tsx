import React from 'react';
import { setCSSVar } from 'utils/Helpers';

type SpinnerProps = {
  /**
   * Type refers to css className. Pre-defined classnames:
   * `spinner` , `gg-spinner`
   */
  type?: 'spinner' | 'gg-spinner' | string;
  /**
   * transform scale value
   */
  size?: number;
};

const Spinner = ({ size = 1, type = 'spinner' }: SpinnerProps): JSX.Element => {
  return (
    <span
      className={type}
      style={setCSSVar({
        '--val-spinner-size': size
      })}
    />
  );
};

Spinner.defaultProps = {
  type: 'spinner',
  size: 1
};

export default Spinner;
