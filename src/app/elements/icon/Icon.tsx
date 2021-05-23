import * as React from 'react';
import { CSSProperties } from 'react';
import './icon.scss';

export enum IconType {
  FILLED = 'filled',
  INTERACTIVE = 'interactive',
  OUTLINED = 'outlined',
  FILLED_OUTLINED = 'filled-outlined'
}

export type IconProps = {
  className?: string;
  style?: CSSProperties;
  icon?: React.ReactElement<SVGElement>;
  theme?: string;
  type?: IconType;
  color?: string;
  bgColor?: string;
  innerScale?: number;
};

class Icon extends React.Component<IconProps> {
  modifyChildren(child, styles) {
    styles = {
      transform: `scale(${this.props.innerScale || 1})`,
      ...styles
    };
    const props = {
      style: styles
    };
    const element = React.cloneElement(child, props);
    return element;
  }

  render() {
    return (
      <i
        className={`d-svg-icon ${this.props.className || ''} ${
          this.props.type || IconType.OUTLINED
        } ${this.props.theme || ''}`.trim()}
        style={this.props.style}
      >
        {this.props.icon
          ? this.modifyChildren(this.props.icon, { color: this.props.color })
          : React.Children.map(this.props.children, (child) =>
              this.modifyChildren(child, { color: this.props.color })
            )}
      </i>
    );
  }
}

export default Icon;
