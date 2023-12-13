'use client';
import {
  FormControl,
  FormHelperText,
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
      <FormControl variant="filled" style={styles.static?.selectContainer}>
        <InputLabel>Navigate to different route</InputLabel>
        <Select variant="filled" style={styles.static?.select} value={pathname}>
          <MenuItem value="/projects/use-query-parameters-demo/form1">
            <Link
              href="/projects/use-query-parameters-demo/form1"
              style={styles.static?.link}
            >
              Form 1
            </Link>
          </MenuItem>
          <MenuItem value="/projects/use-query-parameters-demo/form2">
            <Link
              href="/projects/use-query-parameters-demo/form2"
              style={styles.static?.link}
            >
              Form 2
            </Link>
          </MenuItem>
        </Select>
        <FormHelperText style={{ color: 'white' }}>
          Change the route to erase the current form&apos;s query parameters and
          come back to see that they have been preserved
        </FormHelperText>
      </FormControl>
      {children}
    </>
  );
};
