import { getExperience } from './helper';

type RouteParameters = {
  params: {
    experienceID: string;
  };
};

export async function GET(_: Request, routeParameters: RouteParameters) {
  // const experienceID = routeParameters.params.experienceID;
  const experienceID = '';

  if (experienceID) {
    const experience = await getExperience(experienceID);
    return Response.json({ experience });
  }
  return Response.json({ experience: null });
}
