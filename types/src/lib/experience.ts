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
