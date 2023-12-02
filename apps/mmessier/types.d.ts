import { CSSProperties } from 'react';

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

export type Style = (breakpoint: Breakpoint) => {
  dynamic?: DynamicStyle;
  static?: StaticStyle;
};

export type ExperienceDetail = {
  id: string;
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
};

const defaultExport = {
  Breakpoint,
};

export default defaultExport;
