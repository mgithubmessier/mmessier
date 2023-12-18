'use client';

import { styles as layoutStyles } from './styles.client';
import { QueryParameterProvider } from '@mmessier/use-query-parameters';

import { useStyles } from './hooks/useStyles';
import { IconButton, Paper, Typography } from '@mui/material';
import { Navbar } from './components/Navbar/Navbar';
import { DriftingShapesClient } from './components/DriftingShapes/DriftingShapes.client';
import { GitHub, LinkedIn } from '@mui/icons-material';
import Image from 'next/image';

type LayoutClientProps = {
  children: React.ReactNode;
  commitHash?: string;
};

export const LayoutClient = ({ children, commitHash }: LayoutClientProps) => {
  const styles = useStyles(layoutStyles);

  return (
    <body style={styles.static?.body}>
      <QueryParameterProvider>
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
            <Typography style={styles.static?.commitHash}>
              {commitHash}
            </Typography>
          </div>
        </div>
      </QueryParameterProvider>
    </body>
  );
};
