import { Metadata } from 'next';

import { getExperiences } from '../../lib/getExperiences';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'A summary of my professional experience',
};

export const Experience = async () => {
  const experiences = await getExperiences();
  return (
    <div>
      <h1>Experience</h1>
      <pre>{JSON.stringify(experiences)}</pre>
    </div>
  );
};

export default Experience;
