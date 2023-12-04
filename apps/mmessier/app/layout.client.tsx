'use client';

import { styles as layoutStyles } from './layoutStyles';

import { useStyles } from './hooks/useStyles';
import { Paper, Typography } from '@mui/material';
import { Navbar } from './components/Navbar/Navbar';
import { DriftingShapesClient } from './components/DriftingShapes/DriftingShapes.client';

export const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  const styles = useStyles(layoutStyles);

  return (
    <body style={styles.static?.body}>
      <DriftingShapesClient />
      <div style={styles.static?.container}>
        <Typography variant="h1">Matthew Messier</Typography>
        <Navbar />
        <Paper style={styles.static?.childContainer}>{children}</Paper>
      </div>
    </body>
  );
};
