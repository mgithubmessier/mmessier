import { List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { getExperience } from '../../../lib/getExperiences';
import { ExperienceDetail } from '../../../types';

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
        return (
          <li key={`${detail.id}`}>
            <Typography>{detail.detail}</Typography>
            {detail.subDetails ? <Details details={detail.subDetails} /> : null}
          </li>
        );
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
  console.log('is this running???', experience, experienceID);
  return (
    <div>
      <Typography variant="h2">{experience?.title}</Typography>
      <Typography variant="h3">{experience?.company}</Typography>
      <Details details={experience?.details} />
    </div>
  );
};

export default ExperienceDetails;
