'use client';
import { ExpandMore, Clear } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Chip,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';

import { Experience, ExperienceDetail } from '../../../types';

import { styles as experienceIDStyles } from './styles';
import { useStyles } from '../../hooks/useStyles';
import { useState } from 'react';
import { colors } from '../../styles/colors';
import { compact, pick } from 'lodash';

type DetailHighlightProps = {
  detail: string;
  searchTerms: Array<string>;
};

const DetailHighlight = ({ detail, searchTerms }: DetailHighlightProps) => {
  if (!searchTerms.length) {
    return <Typography>{detail}</Typography>;
  }
  const highlightStyle = {
    color: 'gold',
  };
  const elements = [];
  const words = detail.split(' ');

  let nextPhrase = '';
  let isCurrentlyHighlighted = false;
  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    if (!searchTerms.find((t) => t.toLowerCase() === word.toLowerCase())) {
      if (!isCurrentlyHighlighted) {
        nextPhrase += nextPhrase ? ` ${word}` : word;
      } else {
        elements.push(
          <span style={highlightStyle} key={`${nextPhrase + i}`}>
            {' '}
            {nextPhrase}{' '}
          </span>
        );
        isCurrentlyHighlighted = false;
        nextPhrase = word;
      }
    } else {
      if (isCurrentlyHighlighted) {
        nextPhrase += nextPhrase ? ` ${word}` : word;
      } else {
        elements.push(<span key={`${nextPhrase + i}`}> {nextPhrase} </span>);
        isCurrentlyHighlighted = true;
        nextPhrase = word;
      }
    }
    if (i === words.length - 1) {
      if (isCurrentlyHighlighted) {
        elements.push(
          <span style={highlightStyle} key={`${nextPhrase + i}`}>
            {' '}
            {nextPhrase}{' '}
          </span>
        );
      } else {
        elements.push(<span key={`${nextPhrase + i}`}> {nextPhrase} </span>);
      }
    }
  }
  return <Typography>{elements}</Typography>;
};

type DetailsProps = {
  details?: Array<ExperienceDetail>;
  level: number;
  searchTerms: Array<string>;
};

const Details = ({ details, level, searchTerms }: DetailsProps) => {
  if (!details?.length) {
    return null;
  }
  return (
    <>
      {compact(details).map((detail) => {
        return (
          <Detail
            key={`${detail.id}`}
            detail={detail}
            level={level}
            searchTerms={searchTerms}
          />
        );
      })}
    </>
  );
};

type DetailProps = {
  detail: ExperienceDetail;
  level: number;
  searchTerms: Array<string>;
};

const Detail = ({ detail, level, searchTerms }: DetailProps) => {
  const styles = useStyles(experienceIDStyles);
  const subDetails = compact(detail.subDetails) || [];
  const [expanded, setExpanded] = useState(false);
  return (
    <Accordion
      key={`${detail.id}`}
      sx={styles.dynamic?.accordion(Boolean(subDetails.length), level)}
      expanded={expanded || Boolean(searchTerms?.length)}
    >
      <AccordionSummary
        expandIcon={
          subDetails ? <ExpandMore sx={{ color: 'primary.main' }} /> : null
        }
        onClick={() => setExpanded((e) => !e)}
      >
        <DetailHighlight detail={detail.detail} searchTerms={searchTerms} />
      </AccordionSummary>
      <AccordionDetails>
        {subDetails ? (
          <Details
            details={compact(subDetails)}
            level={level + 1}
            searchTerms={searchTerms}
          />
        ) : null}
      </AccordionDetails>
    </Accordion>
  );
};

type SearchMap = {
  // search word to flattened lodash syntax of all occurences
  [searchableWord: string]: Array<string>;
};
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

const filterExperienceDetails = (
  details: Array<ExperienceDetail>,
  searchTerms: Array<string>
): Array<ExperienceDetail> => {
  if (searchTerms.length) {
    const searchMap = createSearchMap(details);

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

export type ExperienceDetailsClientProps = {
  experience: Experience;
};

export const ExperienceDetailsClient = ({
  experience: experienceParam,
}: ExperienceDetailsClientProps) => {
  const styles = useStyles(experienceIDStyles);
  const [searchTerms, setSearchTerms] = useState<Array<string>>([]);

  const experience: Experience = {
    ...experienceParam,
    details: filterExperienceDetails(experienceParam?.details, searchTerms),
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
      <Autocomplete
        multiple
        value={searchTerms}
        onClose={(event: any, reason) => {
          if (reason.includes('createOption')) {
            setSearchTerms((t) => [...t, event.target.value]);
          }
        }}
        // add "common search terms" to the api, wherever the storage of the experiences themselves are being held
        options={[]}
        freeSolo
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
              key={option}
              sx={{
                color: colors.text.main,
              }}
              onDelete={() => {
                setSearchTerms((t) => {
                  const temp = [...t];
                  temp.splice(t.indexOf(option), 1);
                  return temp;
                });
              }}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              endAdornment: searchTerms.length ? (
                <IconButton onClick={() => setSearchTerms([])}>
                  <Clear sx={{ color: colors.text.main }} />
                </IconButton>
              ) : null,
            }}
            variant="outlined"
            label="Search"
            placeholder="Type a search term and hit <Enter>"
            style={styles.static?.autocompleteField}
            sx={{
              input: {
                color: colors.text.main,
              },
              '& .MuiOutlinedInput-root': {
                paddingRight: '10px!important',
              },
            }}
          />
        )}
      />
      <Details
        details={experience?.details}
        level={0}
        searchTerms={searchTerms}
      />
    </div>
  );
};
