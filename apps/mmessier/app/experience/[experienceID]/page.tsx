import { getExperience, getExperiences } from '../../../lib/getExperiences';

import { ExperienceDetailsClient } from './page.client';

type ExperienceDetailsProps = {
  params: {
    experienceID: string;
  };
};

const ExperienceDetails = async ({
  params: { experienceID },
}: ExperienceDetailsProps) => {
  const experienceResponse = await getExperience(experienceID);
  if (experienceResponse?.experience) {
    return (
      <ExperienceDetailsClient experience={experienceResponse?.experience} />
    );
  }
  return null;
};

export default ExperienceDetails;

// This changes the [experienceID] route from a λ (SSR) to an ● (SSG) components, which means they are generated in-advance by the server
export const generateStaticParams = async () => {
  const experiencesResponse = await getExperiences();
  if (experiencesResponse?.experiences) {
    return experiencesResponse.experiences.map((experience) => ({
      experienceID: experience.id,
    }));
  }
  return null;
};
