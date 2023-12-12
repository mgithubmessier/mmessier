import { Experience } from '../../../../types';
import { experiences } from '../helper';

export const getExperience = async (
  experienceID: string
): Promise<Experience | null> => {
  return experiences.find(({ id }) => id === experienceID) || null;
};
