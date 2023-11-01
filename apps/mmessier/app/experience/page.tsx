import { Metadata } from 'next';
import { Typography } from '@mui/material';

import { getExperiences } from '../../lib/getExperiences';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'A summary of my professional experience',
};

const Experience = async () => {
  const experiences = await getExperiences();
  return (
    <>
      <Typography variant="h2">Experience</Typography>
      <pre>{JSON.stringify(experiences)}</pre>
    </>
  );
};

export default Experience;
