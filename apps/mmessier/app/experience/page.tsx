import { Metadata } from 'next';
import { Typography } from '@mui/material';

import { getExperiences } from '../../lib/getExperiences';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'A summary of my professional experience',
};

const Experience = async () => {
  const experiences = await getExperiences();
  return (
    <>
      <Typography variant="h2">Experience</Typography>
      {experiences.map((experience) => {
        return (
          <Link key={experience.id} href={`/experience/${experience.id}`}>
            <Typography variant="h3">
              {experience.title}, {experience.company}
            </Typography>
          </Link>
        );
      })}
      <pre>{JSON.stringify(experiences)}</pre>
    </>
  );
};

export default Experience;
