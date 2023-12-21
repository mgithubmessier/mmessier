import { configuration } from '../configuration/configuration';
import { ExperienceGetResponse } from '@mmessier/types';

export const getExperiences = async (): Promise<
  ExperienceGetResponse | undefined
> => {
  const headers = new Headers();
  headers.set('authorization', configuration.experienceAPIKey || '');
  const response = await fetch(
    `${configuration.mmessierAPIHost}/experiences/list`,
    {
      headers,
      next: { revalidate: 60 },
    }
  );
  if (!response.ok) {
    // recommended by nextjs so that your component does not have to handle an error
    return undefined;
  }

  return response.json();
};

export const getExperience = async (
  experienceID: string
): Promise<ExperienceGetResponse | undefined> => {
  const headers = new Headers();
  headers.set('authorization', configuration.experienceAPIKey || '');
  const response = await fetch(
    `${configuration.mmessierAPIHost}/experiences/${experienceID}`,
    {
      headers,
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    // recommended by nextjs so that your component does not have to handle an error
    return undefined;
  }

  return response.json();
};
