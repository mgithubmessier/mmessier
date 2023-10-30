import { Metadata } from 'next';

import { getExperiences } from '../../lib/getExperiences';

import { ExperienceClient } from './components/Experience.client';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'A summary of my professional experience',
};

export const Experience = async () => {
  const experiences = await getExperiences();
  return <ExperienceClient experiences={experiences} />;
};

export default Experience;
