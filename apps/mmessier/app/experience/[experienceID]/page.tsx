import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { getExperience } from '../../../lib/getExperiences';
import { ExperienceDetail } from '../../../types';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { styles } from './styles';

type DetailProps = {
  detail: ExperienceDetail;
  level: number;
};

const Detail = ({ detail, level }: DetailProps) => {
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

type ExperienceDetailsProps = {
  params: {
    experienceID: string;
  };
};

const ExperienceDetails = async ({
  params: { experienceID },
}: ExperienceDetailsProps) => {
  const experience = await getExperience(experienceID);
  return (
    <div style={styles.static?.container}>
      <div style={styles.static?.titleContainer}>
        <Typography variant="h2">{experience?.title}</Typography>
        <a target="_blank" href={experience?.companyURL}>
          <Typography variant="h3">{experience?.company}</Typography>
        </a>
      </div>
      <Details details={experience?.details} level={0} />
    </div>
  );
};

export default ExperienceDetails;
