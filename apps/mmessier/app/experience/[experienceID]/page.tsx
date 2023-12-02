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
  const experience = await getExperience(experienceID);
  return <ExperienceDetailsClient experience={experience} />;
};

export default ExperienceDetails;

// This changes the [experienceID] route from a λ (SSR) to an ● (SSG) components, which means they are generated in-advance by the server
export const generateStaticParams = async () => {
  const experiences = await getExperiences();
  return experiences.map((experience) => ({
    experienceID: experience.id,
  }));
};
