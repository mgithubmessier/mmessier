import { Experience } from '../../../../types';
import { experiences } from '../route';

export const getExperience = async (
  experienceID: string
): Promise<Experience | undefined> => {
  return experiences.find(({ id }) => id === experienceID);
};

type RouteParameters = {
  params: {
    experienceID: string;
  };
};

export async function GET(_: Request, routeParameters: RouteParameters) {
  const experienceID = routeParameters.params.experienceID;

  if (experienceID) {
    const experience = await getExperience(experienceID);
    return Response.json({ experience });
  }
  return Response.json({ experience: null });
}
