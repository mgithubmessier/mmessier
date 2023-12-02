'use client';

import Link from 'next/link';
import { Experience } from '../../types';
import { useStyles } from '../hooks/useStyles';
import { buttonSX, styles as experienceStyles } from './styles';
import { Button, Typography } from '@mui/material';
import { format, parseISO } from 'date-fns';

type ExperienceClientProps = {
  experiences: Array<Experience>;
};

export const ExperienceClient = ({ experiences }: ExperienceClientProps) => {
  const styles = useStyles(experienceStyles);
  return (
    <div style={styles.static?.container}>
      <div style={styles.static?.widgetContainer}>
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
                style={styles.dynamic?.alternatingButton(
                  isEven,
                  index,
                  experiences.length
                )}
                sx={buttonSX}
                color="primary"
              >
                <div
                  style={styles.dynamic?.alternatingButtonTextContainer(isEven)}
                >
                  <div style={styles.static?.titleContainer}>
                    <Typography
                      variant="h3"
                      sx={{ color: 'primary.main' }}
                      noWrap
                    >
                      {experience.title}
                    </Typography>
                  </div>
                  <Typography variant="h4" sx={{ color: 'primary.main' }}>
                    {experience.company}
                  </Typography>
                  <div style={styles.static?.dateRangeContainer}>
                    <span style={styles.static?.dateRangeText}>
                      {format(parseISO(experience.startDate), 'MMM y')}
                    </span>
                    <span style={styles.static?.dateRangeSplit}>-</span>
                    {experience.endDate ? (
                      <span style={styles.static?.dateRangeText}>
                        {format(parseISO(experience.endDate), 'MMM y')}
                      </span>
                    ) : (
                      <span style={styles.static?.dateRangeText}>Present</span>
                    )}
                  </div>
                </div>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
