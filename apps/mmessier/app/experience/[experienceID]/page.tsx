import { Typography } from '@mui/material';
import { getExperience } from '../../../lib/getExperiences';
import { ExperienceDetail } from '../../../types';

type DetailsProps = {
  details?: Array<ExperienceDetail>;
  level: number;
};

const Details = ({ details, level }: DetailsProps) => {
  if (!details?.length) {
    return null;
  }
  return (
    <div style={{ paddingLeft: level * 6 }}>
      {details.map((detail) => {
        return (
          <div key={`${detail.id}`}>
            <Typography>{detail.detail}</Typography>
            {detail.subDetails ? (
              <Details details={detail.subDetails} level={level + 1} />
            ) : null}
          </div>
        );
      })}
    </div>
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
    <>
      <Typography variant="h3">{experience?.title}</Typography>
      <Typography variant="h4">{experience?.company}</Typography>
      <Details details={experience?.details} level={0} />
    </>
  );
};

export default ExperienceDetails;
