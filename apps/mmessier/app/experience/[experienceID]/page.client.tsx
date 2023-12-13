'use client';
import { Button, Typography } from '@mui/material';
import { useQueryParameters } from '@mmessier/use-query-parameters';

import { Experience, ExperienceDetail } from '../../../types';
import { Details } from './components/Details/Details.client';

import { styles as experienceIDStyles } from './styles';
import { useStyles } from '../../hooks/useStyles';
import { useEffect, useState } from 'react';
import { pick } from 'lodash';
import { DetailsSearch } from './components/DetailsSearch/DetailsSearch';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from '@mui/icons-material';

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

type SearchTerms = {
  [searchTerm: string]: boolean;
};

export const ExperienceDetailsClient = ({
  experience: experienceParam,
  searchMap,
}: ExperienceDetailsClientProps) => {
  const styles = useStyles(experienceIDStyles);
  const pathname = usePathname();
  const { queryParameters, set } =
    useQueryParameters<ExperienceDetailQueryParameters>(pathname);
  const [searchTerms, setSearchTerms] = useState<SearchTerms>(
    queryParameters?.terms?.reduce<SearchTerms>((acc, term) => {
      return {
        ...acc,
        [term]: true,
      };
    }, {}) || {}
  );

  useEffect(() => {
    set('terms', Object.keys(searchTerms));
  }, [searchTerms]);

  const experience: Experience = {
    ...experienceParam,
    details: filterExperienceDetails(
      experienceParam?.details,
      searchMap,
      Object.keys(searchTerms)
    ),
  };

  return (
    <div style={styles.static?.container}>
      <div style={styles.static?.titleContainer}>
        <Link href="/experience">
          <Button startIcon={<ArrowLeft />} style={styles.static?.backButton}>
            Back to Experiences
          </Button>
        </Link>
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
        options={experience.keyTerms}
        searchTerms={Object.keys(searchTerms)}
        onAddSearchTerm={(searchTermsToAdd) => {
          const tempSearchTerms: SearchTerms = {};
          searchTermsToAdd.forEach((searchTermToAdd) => {
            tempSearchTerms[searchTermToAdd] = true;
          });
          setSearchTerms((t) => ({ ...t, ...tempSearchTerms }));
        }}
        onClearSearchTerms={() => setSearchTerms({})}
        onRemoveSearchTerm={(searchTerm) => {
          setSearchTerms((t) => {
            const temp = { ...t };
            if (temp[searchTerm]) {
              delete temp[searchTerm];
            }
            return temp;
          });
        }}
      />
      <Details
        details={experience?.details}
        level={0}
        searchTerms={Object.keys(searchTerms)}
      />
    </div>
  );
};
