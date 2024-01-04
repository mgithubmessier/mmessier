'use client';

import { useStyles } from '../../../../hooks/useStyles';
import { ExperienceDetail } from '@mmessier/types';
import { compact } from 'lodash';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { useState } from 'react';
import { DetailHighlight } from '../DetailHighlight/DetailHighlight.client';

import { styles as detailsStyles } from './styles';

type DetailsProps = {
  details?: Array<ExperienceDetail>;
  level: number;
  searchTerms: Array<string>;
};

export const Details = ({ details, level, searchTerms }: DetailsProps) => {
  if (!details?.length) {
    return null;
  }
  return (
    <>
      {compact(details).map((detail) => {
        return (
          <Detail
            key={`${detail.detail}`}
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
  const styles = useStyles(detailsStyles);
  const subDetails = compact(detail.subDetails) || [];
  const [expanded, setExpanded] = useState(false);
  return (
    <Accordion
      key={`${detail.detail}`}
      sx={styles.dynamic?.accordion(Boolean(subDetails.length), level)}
      expanded={expanded || Boolean(searchTerms?.length)}
    >
      <AccordionSummary
        expandIcon={
          subDetails.length && !searchTerms?.length ? (
            <ExpandMore sx={{ color: 'primary.main' }} />
          ) : null
        }
        onClick={() => setExpanded((e) => !e)}
      >
        <DetailHighlight detail={detail.detail} searchTerms={searchTerms} />
      </AccordionSummary>
      <AccordionDetails>
        {subDetails.length ? (
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
