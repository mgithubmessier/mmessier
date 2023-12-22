import { Metadata } from 'next';

import { getExperiences } from '../../lib/getExperiences';
import { ExperienceClient } from './page.client';
import { NotFoundClient } from '../components/NotFound';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'A summary of my professional experience',
};

const Experience = async () => {
  const experiencesResponse = await getExperiences();
  if (experiencesResponse?.experiences) {
    return <ExperienceClient experiences={experiencesResponse.experiences} />;
  }
  return <NotFoundClient />;
};

export default Experience;
