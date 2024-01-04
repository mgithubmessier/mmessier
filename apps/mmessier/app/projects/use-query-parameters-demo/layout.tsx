import { Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';

import { basicStyles } from './styles';
import { ArrowLeft } from '@mui/icons-material';
import { UseQueryParametersDemoClient } from './layout.client';

type UseQueryParametersDemoProps = {
  children: React.ReactNode;
};

const UseQueryParametersDemo = ({ children }: UseQueryParametersDemoProps) => {
  return (
    <div style={basicStyles.static?.container}>
      <Link href="/projects">
        <Button startIcon={<ArrowLeft />}>Back to Projects</Button>
      </Link>
      <UseQueryParametersDemoClient>{children}</UseQueryParametersDemoClient>
    </div>
  );
};

export default UseQueryParametersDemo;
