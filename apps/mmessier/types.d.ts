import { SxProps, Theme } from '@mui/material';
import { CSSProperties } from 'react';

export type Configuration = {
  mmessierAPIHost?: string;
  mmessierAPIToken?: string;
};

export enum Breakpoint {
  SMALL = 'small',
  MEDIUM = 'medium',
  DEFAULT = 'default',
}

type StaticStyle = {
  [x: string]: CSSProperties;
};

type DynamicStyle = {
  [y: string]: (...args) => CSSProperties;
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

export type ExperienceDetail = {
  detail: string;
  subDetails?: Array<ExperienceDetail>;
};

export type Experience = {
  id: string;
  company: string;
  companyURL: string;
  title: string;
  details: Array<ExperienceDetail>;
  startDate: string;
  endDate?: string;
  location: string;
  logo: string;
  keyTerms: Array<string>;
};

type BaseResponse = {
  errors: Array<string>;
};

export type ExperienceGetByIdResponse = BaseResponse & {
  experience: Experience;
};

export type ExperienceGetResponse = BaseResponse & {
  experiences: Array<Experience>;
};

const defaultExport = {
  Breakpoint,
};

export default defaultExport;
