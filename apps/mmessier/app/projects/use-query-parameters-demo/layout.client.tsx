'use client';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';

import { basicStyles } from './styles';
import { usePathname } from 'next/navigation';

type UseQueryParametersDemoProps = {
  children: React.ReactNode;
};

export const UseQueryParametersDemoClient = ({
  children,
}: UseQueryParametersDemoProps) => {
  const pathname = usePathname();
  return (
    <>
      <FormControl variant="filled">
        <InputLabel>Navigate to different route</InputLabel>
        <Select
          variant="filled"
          style={basicStyles.static?.select}
          value={pathname}
        >
          <MenuItem value="/projects/use-query-parameters-demo/form1">
            <Link
              href="/projects/use-query-parameters-demo/form1"
              style={basicStyles.static?.link}
            >
              Form 1
            </Link>
          </MenuItem>
          <MenuItem value="/projects/use-query-parameters-demo/form2">
            <Link
              href="/projects/use-query-parameters-demo/form2"
              style={basicStyles.static?.link}
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
