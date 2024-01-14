'use client';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';

import { styles as uqpdStyles, basicStyles } from './styles';
import { usePathname } from 'next/navigation';
import { useStyles } from '../../../../hooks/useStyles';
import { DEMO_FORMS } from '../constants';
import { ArrowLeft } from '@mui/icons-material';

type UQPDFormContainerProps = {
  children: React.ReactNode;
};

export const UQPDFormContainer = ({ children }: UQPDFormContainerProps) => {
  const pathname = usePathname();
  const styles = useStyles(uqpdStyles);
  return (
    <div style={basicStyles.static?.container}>
      <Link href="/projects">
        <Button startIcon={<ArrowLeft />}>Back to Projects</Button>
      </Link>
      <Typography variant="h2">Demo Form</Typography>
      <Typography style={styles.static?.text}>
        Change the URL route to erase the current form&apos;s query parameters
        and come back to see that they have been preserved
      </Typography>
      <FormControl variant="filled" style={styles.static?.selectContainer}>
        <InputLabel>Change the URL route</InputLabel>
        <Select variant="filled" style={styles.static?.select} value={pathname}>
          {DEMO_FORMS.map((form) => {
            return (
              <MenuItem
                value={`/projects/use-query-parameters-demo/${form}`}
                key={form}
              >
                <Link
                  href={`/projects/use-query-parameters-demo/${form}`}
                  style={styles.static?.link}
                >
                  {form}
                </Link>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {children}
    </div>
  );
};
