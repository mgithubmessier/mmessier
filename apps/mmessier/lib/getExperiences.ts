import {
  Experience,
  ExperienceGetByIdResponse,
  ExperienceGetResponse,
} from '../types';

export const getExperiences = async (): Promise<
  ExperienceGetResponse | undefined
> => {
  const response = await fetch('http://localhost:4200/api/experiences', {
    next: { revalidate: 60 },
  });
  if (!response.ok) {
    // recommended by nextjs so that your component does not have to handle an error
    return undefined;
  }

  return response.json();
};

export const getExperience = async (
  experienceID: string
): Promise<ExperienceGetByIdResponse | undefined> => {
  const response = await fetch(
    `http://localhost:4200/api/experiences/${experienceID}`,
    { next: { revalidate: 60 } }
  );
  if (!response.ok) {
    // recommended by nextjs so that your component does not have to handle an error
    return undefined;
  }

  return response.json();
};
