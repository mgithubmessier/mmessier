import { ExperienceDetail } from '@mmessier/types';
import { getExperience, getExperiences } from '../../../lib/getExperiences';

import { ExperienceDetailsClient, SearchMap } from './page.client';
import { compact } from 'lodash';
import { NotFoundClient } from '../../components/NotFound';

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
          compact(detail.subDetails),
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
  const experience = experienceResponse?.experiences?.[0];
  if (experience) {
    const searchMap = createSearchMap(compact(experience.details));
    return (
      <ExperienceDetailsClient experience={experience} searchMap={searchMap} />
    );
  }
  return <NotFoundClient />;
};

export default ExperienceDetails;

// This changes the [experienceID] route from a λ (SSR) to an ● (SSG) components, which means they are generated in-advance by the server
export const generateStaticParams = async () => {
  const experiencesResponse = await getExperiences();
  if (experiencesResponse?.experiences) {
    return experiencesResponse.experiences.map((experience) => ({
      experienceID: experience.startDate,
    }));
  }
  return [];
};
