import { Metadata } from 'next';

import { getExperiences } from '../../lib/getExperiences';
import { ExperienceClient } from './page.client';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'A summary of my professional experience',
};

const Experience = async () => {
  const experiences = await getExperiences();
  return <ExperienceClient experiences={experiences} />;
};

export default Experience;
