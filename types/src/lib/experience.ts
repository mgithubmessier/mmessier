import { BaseGetResponse } from './response';

export type ExperienceDetail = {
  detail: string;
  subDetails?: Array<ExperienceDetail>;
};

export type Experience = {
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

export type ExperienceGetResponse = BaseGetResponse & {
  experiences?: Array<Experience>;
};
