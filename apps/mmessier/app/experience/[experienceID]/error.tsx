'use client';

import { useEffect } from 'react';
import { ErrorPage } from '../../components/Error/Error';

export const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <ErrorPage
      title="Error loading experience details"
      message={error.message}
      reset={reset}
    />
  );
};

export default Error;
