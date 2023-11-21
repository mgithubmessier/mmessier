import { CSSProperties } from 'react';

export type Style = {
  dynamic?: {
    [y: string]: (...args) => CSSProperties;
  };
  static?: {
    [x: string]: CSSProperties;
  };
};

export type ExperienceDetail = {
  id: string;
  detail: string;
  subDetails?: Array<ExperienceDetail>;
};

export type Experience = {
  id: string;
  company: string;
  title: string;
  details: Array<ExperienceDetail>;
  startDate: string;
  endDate?: string;
  location: string;
  logo: string;
};
