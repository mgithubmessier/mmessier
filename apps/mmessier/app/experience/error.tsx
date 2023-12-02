'use client';
import { ErrorPage } from '../components/Error/Error';

export const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <ErrorPage
      title="Error loading experiences"
      message={error.message}
      reset={reset}
    />
  );
};

export default Error;
