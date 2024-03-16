'use client';

import { styles as layoutStyles } from './styles.client';
import { QueryParameterProvider } from '@mmessier/use-query-parameters';

import { useStyles } from './hooks/useStyles';
import {
  Alert,
  CircularProgress,
  IconButton,
  Paper,
  Snackbar,
  Typography,
} from '@mui/material';
import { Navbar } from './components/Navbar/Navbar';
import { DriftingShapesClient } from './components/DriftingShapes/DriftingShapes.client';
import { GitHub, LinkedIn } from '@mui/icons-material';
import Image from 'next/image';
import { useAuthorizationState } from './zustand/AuthorizationState/AuthorizationState';
import { useEffect } from 'react';
import { AuthenticationPostResponse } from '@mmessier/types';
import { useSnackbarState } from './zustand/SnackbarState/SnackbarState';
import { makeRequest } from './utilities/makeRequest.client';

type LayoutClientProps = {
  children: React.ReactNode;
  commitHash?: string;
  ip: string;
};

export const LayoutClient = ({
  children,
  commitHash,
  ip,
}: LayoutClientProps) => {
  const snackbarState = useSnackbarState();
  const authorizationState = useAuthorizationState();
  const styles = useStyles(layoutStyles);

  useEffect(() => {
    const asyncFunc = async () => {
      const response = await makeRequest<AuthenticationPostResponse>({
        method: 'POST',
        failure: {
          message: 'Failed to authenticate, please try again in a few minutes',
          timeoutMS: 6000,
          variant: 'error',
        },
        url: '/api/authenticate',
      });

      if (response?.token) {
        authorizationState.setToken(response.token);
      }
    };
    if (!authorizationState.token && ip) {
      asyncFunc();
    }
  }, [authorizationState.token, ip]);

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
          <Paper style={styles.static?.childContainer}>
            {!authorizationState.token ? (
              <div style={styles.static?.loadingContainer}>
                <CircularProgress size="4rem" />
              </div>
            ) : (
              children
            )}
          </Paper>
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
      <Snackbar open={snackbarState.open}>
        <Alert severity={snackbarState.variant || 'success'}>
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </body>
  );
};
