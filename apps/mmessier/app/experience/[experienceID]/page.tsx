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
};

const Detail = ({ detail }: DetailProps) => {
  return (
    <Accordion
      key={`${detail.id}`}
      sx={styles.dynamic?.accordion(Boolean(detail.subDetails))}
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
        {detail.subDetails ? <Details details={detail.subDetails} /> : null}
      </AccordionDetails>
    </Accordion>
  );
};

type DetailsProps = {
  details?: Array<ExperienceDetail>;
};

const Details = ({ details }: DetailsProps) => {
  if (!details?.length) {
    return null;
  }
  return (
    <>
      {details.map((detail) => {
        return <Detail key={`${detail.id}`} detail={detail} />;
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
        <Typography variant="h3">{experience?.company}</Typography>
      </div>
      <Details details={experience?.details} />
    </div>
  );
};

export default ExperienceDetails;
