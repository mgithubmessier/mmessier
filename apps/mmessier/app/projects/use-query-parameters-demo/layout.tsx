'use client';
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';

import { basicStyles } from './styles';
import { ArrowLeft } from '@mui/icons-material';
import { usePathname } from 'next/navigation';

type UseQueryParametersDemoProps = {
  children: React.ReactNode;
};

export const UseQueryParametersDemo = ({
  children,
}: UseQueryParametersDemoProps) => {
  const pathname = usePathname();
  return (
    <div style={basicStyles.static?.container}>
      <Link href="/projects">
        <Button
          startIcon={<ArrowLeft />}
          style={basicStyles.static?.backButton}
        >
          Back to Projects
        </Button>
      </Link>
      <FormControl>
        <InputLabel style={{ color: 'white' }}>
          Navigate to different route
        </InputLabel>
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
    </div>
  );
};

export default UseQueryParametersDemo;
