import { ReactNode } from 'react';
import { ButtonProps } from "../elements/Button/Button";

export class LinkData {
  path?: string;
  title?: string;
  newTab?: boolean;
  isExternal?: boolean;
  associatedIcon?: ReactNode;
  appearance?: ButtonProps['appearance'];

  constructor(data?) {
    Object.assign(this, data);
  }
}
