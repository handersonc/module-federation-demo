/* eslint-disable @typescript-eslint/no-extra-semi */
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type ButtonProps = {
  buttonType?: 'button' | 'submit';
  className?: ButtonStyle[];
  title: string;
  loading?: boolean;
  link?: string;
  icon?: IconProp;
  onClick?: (...args: any[]) => any;
  [x: string]: any;
};

enum ButtonStyle {
  Primary = 'button--primary',
  Secondary = 'button--secondary',
  Outline = 'button--outline',
  Dashed = 'button--dashed',
  Small = 'button--small',
  Fullwidth = 'button--fullwidth',
  Icons = 'button--with-icons',
  Loading = 'button--loading',
  Centered = 'button--centered',
  Danger = 'button--danger',
  IconRight = 'button--icon-to-right',
  Rounded = 'button--rounded'
};

export {
  ButtonStyle
};
export type { ButtonProps };

