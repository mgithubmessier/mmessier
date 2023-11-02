import { Metadata } from 'next';
import { Button, Typography } from '@mui/material';

import { getExperiences } from '../../lib/getExperiences';
import Link from 'next/link';

import { styles } from './styles';
import Loading from './loading';
import { CSSProperties } from 'react';
import { colors } from '../styles/colors';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'A summary of my professional experience',
};

const Experience = async () => {
  const experiences = await getExperiences();
  return (
    <div style={styles.container}>
      <Typography variant="h2">Experience</Typography>
      {experiences.map((experience, index) => {
        const alternatingLinkStyle: CSSProperties =
          index % 2 === 0
            ? {}
            : {
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              };
        const alternatingButtonTextContainerStyle: CSSProperties =
          index % 2 === 0
            ? {
                ...alternatingLinkStyle,
                marginLeft: 16,
              }
            : {
                ...alternatingLinkStyle,
                marginRight: 16,
              };
        const alternatingButtonStyle: CSSProperties =
          index % 2 === 0
            ? {}
            : {
                flexDirection: 'row-reverse',
              };
        const alternatingCompanyLogoContainerStyle: CSSProperties =
          index % 2 === 0
            ? {
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
              }
            : {
                borderTopRightRadius: 6,
                borderBottomRightRadius: 6,
              };
        return (
          <Link
            key={experience.id}
            href={`/experience/${experience.id}`}
            style={{ ...styles.link, ...alternatingLinkStyle }}
          >
            <Button
              variant="text"
              style={{
                ...styles.button,
                ...colors.alternating[index % 5],
                ...alternatingButtonStyle,
              }}
              color="primary"
            >
              <div
                style={{
                  ...styles.companyLogoContainer,
                  ...alternatingCompanyLogoContainerStyle,
                }}
              >
                <img
                  alt="company_logo"
                  src="https://dispatch.me/wp-content/themes/dispatch-skin/assets/img/preloader-logo.png"
                  style={styles.companyLogo}
                />
              </div>
              <div
                style={{
                  ...styles.buttonTextContainer,
                  ...alternatingButtonTextContainerStyle,
                }}
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
