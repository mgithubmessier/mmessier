import { Experience } from '@mmessier/types';
import { experiences } from './helper';

const getExperiencesHandler = async (): Promise<Array<Experience>> => {
  return experiences;
};

export async function GET(request: Request) {
  const experiences = await getExperiencesHandler();
  return Response.json({ experiences });
}
