'use client';
import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { Experience, ExperienceDetail } from '../../../types';

import { styles as experienceIDStyles } from './styles';
import { useStyles } from '../../hooks/useStyles';

type DetailsProps = {
  details?: Array<ExperienceDetail>;
  level: number;
};

const Details = ({ details, level }: DetailsProps) => {
  if (!details?.length) {
    return null;
  }
  return (
    <>
      {details.map((detail) => {
        return <Detail key={`${detail.id}`} detail={detail} level={level} />;
      })}
    </>
  );
};

type DetailProps = {
  detail: ExperienceDetail;
  level: number;
};

const Detail = ({ detail, level }: DetailProps) => {
  const styles = useStyles(experienceIDStyles);
  return (
    <Accordion
      key={`${detail.id}`}
      sx={styles.dynamic?.accordion(Boolean(detail.subDetails), level)}
    >
      <AccordionSummary
        expandIcon={
          detail.subDetails ? (
            <ExpandMore sx={{ color: 'primary.main' }} />
          ) : null
        }
      >
        <Typography style={styles.static?.detailText}>
          {detail.detail}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {detail.subDetails ? (
          <Details details={detail.subDetails} level={level + 1} />
        ) : null}
      </AccordionDetails>
    </Accordion>
  );
};

export type ExperienceDetailsClientProps = {
  experience?: Experience;
};

export const ExperienceDetailsClient = ({
  experience,
}: ExperienceDetailsClientProps) => {
  const styles = useStyles(experienceIDStyles);
  return (
    <div style={styles.static?.container}>
      <div style={styles.static?.titleContainer}>
        <Typography variant="h2">{experience?.title}</Typography>
        <a
          target="_blank"
          href={experience?.companyURL}
          style={styles.static?.companyURL}
        >
          <Typography variant="h3">{experience?.company}</Typography>
        </a>
      </div>
      <Details details={experience?.details} level={0} />
    </div>
  );
};
