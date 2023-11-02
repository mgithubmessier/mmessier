import { Typography } from '@mui/material';
import { getExperience } from '../../../lib/getExperiences';
import { ExperienceDetail } from '../../../types';

type DetailProps = {
  detail: ExperienceDetail;
};

const Detail = ({ detail }: DetailProps) => {
  return (
    <li key={`${detail.id}`}>
      <Typography>{detail.detail}</Typography>
      {detail.subDetails ? <Details details={detail.subDetails} /> : null}
    </li>
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
    <ul>
      {details.map((detail) => {
        return <Detail key={`${detail.id}`} detail={detail} />;
      })}
    </ul>
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
    <div>
      <Typography variant="h2">{experience?.title}</Typography>
      <Typography variant="h3">{experience?.company}</Typography>
      <Details details={experience?.details} />
    </div>
  );
};

export default ExperienceDetails;