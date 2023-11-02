import { Metadata } from 'next';
import { Button, Typography } from '@mui/material';

import { getExperiences } from '../../lib/getExperiences';
import Link from 'next/link';

import { styles } from './styles';
import Loading from './loading';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'A summary of my professional experience',
};

const Experience = async () => {
  const experiences = await getExperiences();
  return (
    <div style={styles.container}>
      <Typography variant="h2">Experience</Typography>
      {experiences.map((experience) => {
        return (
          <Link
            key={experience.id}
            href={`/experience/${experience.id}`}
            style={styles.link}
          >
            <Button variant="text" style={styles.button} color="primary">
              <Typography variant="h4" sx={{ color: 'primary.main' }}>
                {experience.title}
              </Typography>
              <Typography variant="h5" sx={{ color: 'primary.main' }}>
                {experience.company}
              </Typography>
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

export default Experience;
