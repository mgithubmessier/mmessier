'use client';

import { styles as layoutStyles } from './styles.client';

import { useStyles } from './hooks/useStyles';
import { IconButton, Paper, Typography } from '@mui/material';
import { Navbar } from './components/Navbar/Navbar';
import { DriftingShapesClient } from './components/DriftingShapes/DriftingShapes.client';
import { GitHub, LinkedIn } from '@mui/icons-material';
import Image from 'next/image';

export const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  const styles = useStyles(layoutStyles);

  return (
    <body style={styles.static?.body}>
      <DriftingShapesClient />
      <div style={styles.static?.container}>
        <div style={styles.static?.headingContainer}>
          <div style={styles.static?.imageContainer}>
            <Image
              src="/profile_picture.jpeg"
              alt="profile_picture"
              fill
              style={styles.static?.image}
            />
          </div>
          <Typography variant="h1">Matthew Messier</Typography>
        </div>
        <Navbar />
        <Paper style={styles.static?.childContainer}>{children}</Paper>
        <div style={styles.static?.platformIconContainer}>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/matt-messier-5605a417/"
          >
            <IconButton>
              <LinkedIn sx={styles.sx?.platformIcon} />
            </IconButton>
          </a>
          <a target="_blank" href="https://github.com/mgithubmessier">
            <IconButton>
              <GitHub sx={styles.sx?.platformIcon} />
            </IconButton>
          </a>
        </div>
      </div>
    </body>
  );
};
