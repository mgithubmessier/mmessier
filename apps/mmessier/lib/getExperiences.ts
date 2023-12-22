import { ExperienceGetResponse } from '@mmessier/types';
import { configuration } from '../configuration/configuration';
import { notFound } from 'next/navigation';

const headers = new Headers();
headers.set('authorization', configuration.experienceAPIKey || '');

export const getExperiences = async (): Promise<
  ExperienceGetResponse | undefined
> => {
  const response = await fetch(
    `${configuration.mmessierAPIHost}/experiences/list`,
    {
      headers,
      next: { revalidate: 60 },
    }
  );
  if (!response.ok) {
    const errorResponse = await response.json();
    if (errorResponse?.error) {
      throw new Error(errorResponse?.error);
    }
    throw new Error('Server error');
  }

  return response.json();
};

export const getExperience = async (
  experienceID: string
): Promise<ExperienceGetResponse | undefined> => {
  const response = await fetch(
    `${configuration.mmessierAPIHost}/experiences/${experienceID}`,
    {
      headers,
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    if (errorResponse?.error) {
      throw new Error(errorResponse?.error);
    }
    throw new Error(`Server error: ${JSON.stringify(errorResponse)}`);
  }

  const experienceResponse: ExperienceGetResponse = await response.json();

  if (experienceResponse.experiences?.length === 0) {
    notFound();
  }

  return experienceResponse;
};
