'use client';

import { styles as layoutStyles } from './layoutStyles';

import { useStyles } from './hooks/useStyles';
import { Paper, Typography } from '@mui/material';
import { Navbar } from './components/Navbar/Navbar';
import { DriftingShapes } from './components/DriftingShapes/DriftingShapes';

export const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  const styles = useStyles(layoutStyles);

  return (
    <body style={styles.static?.body}>
      <DriftingShapes />
      <div style={styles.static?.container}>
        <Typography variant="h1">Matthew Messier</Typography>
        <Navbar />
        <Paper style={styles.static?.childContainer}>{children}</Paper>
      </div>
    </body>
  );
};
