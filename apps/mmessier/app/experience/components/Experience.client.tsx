'use client';

import { Typography } from '@mui/material';

type ExperienceProps = {
  experiences: any;
};

export const ExperienceClient = ({ experiences }: ExperienceProps) => {
  return (
    <>
      <Typography variant="h2">Experience</Typography>

      <pre>{JSON.stringify(experiences)}</pre>
    </>
  );
};
