'use client';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';

import { styles as uqpdStyles } from './styles';
import { usePathname } from 'next/navigation';
import { useStyles } from '../../hooks/useStyles';
import { DEMO_FORMS } from './[routeName]/constants';

type UseQueryParametersDemoProps = {
  children: React.ReactNode;
};

export const UseQueryParametersDemoClient = ({
  children,
}: UseQueryParametersDemoProps) => {
  const pathname = usePathname();
  const styles = useStyles(uqpdStyles);
  return (
    <>
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
    </>
  );
};
