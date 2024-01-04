'use client';
import React from 'react';

import { styles as LoadingStyles } from './Loading.styles';
import { useStyles } from '../../hooks/useStyles';
import { CircularProgress } from '@mui/material';

export const LoadingContainer = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const styles = useStyles(LoadingStyles);
  return (
    <div style={styles.static?.container}>
      <CircularProgress style={styles.static?.circularProgress} />
    </div>
  );
};
