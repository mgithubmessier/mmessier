import { ExperienceDetail } from '../../../types';
import { getExperience, getExperiences } from '../../../lib/getExperiences';

import { ExperienceDetailsClient, SearchMap } from './page.client';

const createSearchMap = (
  details: Array<ExperienceDetail>,
  path = '',
  searchMap: SearchMap = {}
): SearchMap => {
  if (details.length) {
    for (let detailIndex = 0; detailIndex < details.length; detailIndex++) {
      const detail = details[detailIndex];
      const currentPath = `${path ? path + '.' : path}[${detailIndex}]`;
      if (detail.subDetails?.length) {
        createSearchMap(
          detail.subDetails,
          `${currentPath}.subDetails`,
          searchMap
        );
      }
      const searchableWords = detail.detail.split(' ');
      for (let searchableWord of searchableWords) {
        searchableWord = searchableWord
          .replace(/[^a-zA-Z\d\s:]/g, '')
          .toLowerCase();
        if (searchableWord) {
          const indexPaths = currentPath.split('.subDetails.');
          const paths = [];
          paths.push(
            ...indexPaths.map((_, index) => {
              return `${indexPaths
                .slice(0, index + 1)
                .join('.subDetails.')}.detail`;
            })
          );
          paths.push(
            ...indexPaths.map((_, index) => {
              return `${indexPaths
                .slice(0, index + 1)
                .join('.subDetails.')}.id`;
            })
          );
          if (searchMap[searchableWord]) {
            searchMap[searchableWord].push(...paths);
          } else {
            searchMap[searchableWord] = [...paths];
          }
        }
      }
    }
  }

  return searchMap;
};

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
    const searchMap = createSearchMap(experienceResponse?.experience.details);
    return (
      <ExperienceDetailsClient
        experience={experienceResponse?.experience}
        searchMap={searchMap}
      />
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
  return [];
};
