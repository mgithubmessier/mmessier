import { Metadata } from 'next';
import { Button, Typography } from '@mui/material';

import { getExperiences } from '../../lib/getExperiences';
import Link from 'next/link';

import { styles } from './styles';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'A summary of my professional experience',
};

const Experience = async () => {
  const experiences = await getExperiences();
  return (
    <div style={styles.static?.container}>
      <Typography variant="h2">Experience</Typography>
      {experiences.map((experience, index) => {
        const isEven = index % 2 === 0;
        return (
          <Link
            key={experience.id}
            href={`/experience/${experience.id}`}
            style={styles.dynamic?.alternatingLink(isEven)}
          >
            <Button
              variant="text"
              style={styles.dynamic?.alternatingButton(isEven, index)}
              color="primary"
            >
              <div
                style={styles.dynamic?.alternatingCompanyLogoContainer(isEven)}
              >
                <img
                  alt="company_logo"
                  src="https://dispatch.me/wp-content/themes/dispatch-skin/assets/img/preloader-logo.png"
                  style={styles.static?.companyLogo}
                />
              </div>
              <div
                style={styles.dynamic?.alternatingButtonTextContainer(isEven)}
              >
                <Typography variant="h4" sx={{ color: 'primary.main' }}>
                  {experience.title}
                </Typography>
                <Typography variant="h5" sx={{ color: 'primary.main' }}>
                  {experience.company}
                </Typography>
              </div>
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

export default Experience;
