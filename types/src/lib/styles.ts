import { SxProps, Theme } from '@mui/material';
import { CSSProperties } from 'react';

export const enum Breakpoint {
  SMALL = 'small',
  MEDIUM = 'medium',
  DEFAULT = 'default',
}

type StaticStyle = {
  [x: string]: CSSProperties;
};

type DynamicStyle = {
  [y: string]: (...args: any[]) => CSSProperties;
};

type SXStyle = {
  [z: string]: SxProps<Theme>;
};

export type BasicStyle = {
  dynamic?: DynamicStyle;
  static?: StaticStyle;
  sx?: SXStyle;
};

export type Style = (breakpoint: Breakpoint) => BasicStyle;
