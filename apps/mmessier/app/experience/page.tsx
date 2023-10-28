import { Metadata } from 'next';

import { getExperience } from '../../lib/getExperience';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'A summary of my professional experience',
};

export const Experience = async () => {
  const experience: Promise<any[]> = await getExperience();

  return (
    <div>
      <h1>Experience</h1>
      <pre>{JSON.stringify(experience)}</pre>
    </div>
  );
};

export default Experience;
