'use client';
import { Typography } from '@mui/material';
import { useQueryParameters } from '@mmessier/use-query-parameters';

import { Experience, ExperienceDetail } from '../../../types';
import { Details } from './components/Details/Details.client';

import { styles as experienceIDStyles } from './styles';
import { useStyles } from '../../hooks/useStyles';
import { useEffect, useState } from 'react';
import { pick } from 'lodash';
import { DetailsSearch } from './components/DetailsSearch/DetailsSearch';
import { usePathname } from 'next/navigation';

export type SearchMap = {
  // search word to flattened lodash syntax of all occurences
  [searchableWord: string]: Array<string>;
};

const filterExperienceDetails = (
  details: ExperienceDetail[],
  searchMap: SearchMap,
  searchTerms: Array<string>
): Array<ExperienceDetail> => {
  if (searchTerms.length) {
    const searchedPaths = [];
    for (let searchTerm of searchTerms) {
      searchTerm = searchTerm.toLowerCase();
      if (searchMap[searchTerm]?.length) {
        searchedPaths.push(...searchMap[searchTerm]);
      }
    }
    const filteredDetails = pick(details, searchedPaths) as ExperienceDetail[];
    return Object.values(filteredDetails);
  }
  return details;
};

type ExperienceDetailQueryParameters = {
  terms?: Array<string>;
};

export type ExperienceDetailsClientProps = {
  experience: Experience;
  searchMap: SearchMap;
};

export const ExperienceDetailsClient = ({
  experience: experienceParam,
  searchMap,
}: ExperienceDetailsClientProps) => {
  const styles = useStyles(experienceIDStyles);
  const pathname = usePathname();
  const { queryParameters, set } =
    useQueryParameters<ExperienceDetailQueryParameters>(pathname);
  const [searchTerms, setSearchTerms] = useState<Array<string>>(
    queryParameters?.terms || []
  );

  useEffect(() => {
    set('terms', searchTerms);
  }, [searchTerms]);

  const experience: Experience = {
    ...experienceParam,
    details: filterExperienceDetails(
      experienceParam?.details,
      searchMap,
      searchTerms
    ),
  };

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
      <DetailsSearch
        options={experience.keyTerms.map((term) => ({
          label: term,
          value: term,
        }))}
        searchTerms={searchTerms}
        onAddSearchTerm={(searchTerms) =>
          setSearchTerms((t) => [...t, ...searchTerms])
        }
        onClearSearchTerms={() => setSearchTerms([])}
        onRemoveSearchTerm={(searchTerm) => {
          setSearchTerms((t) => {
            const temp = [...t];
            temp.splice(t.indexOf(searchTerm), 1);
            return temp;
          });
        }}
      />
      <Details
        details={experience?.details}
        level={0}
        searchTerms={searchTerms}
      />
    </div>
  );
};
