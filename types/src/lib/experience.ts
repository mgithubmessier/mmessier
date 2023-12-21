export type ExperienceDetail = {
  detail: string;
  subDetails?: Array<ExperienceDetail>;
};

export type Experience = {
  uuid: string;
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
  error?: string | null;
  next_page_key?: string | null;
};

export type ExperienceGetResponse = BaseResponse & {
  experiences?: Array<Experience>;
};
