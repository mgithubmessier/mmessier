'use client';
import { useRef } from 'react';
import { VERTICAL_SPREAD, getSlideAnimationDuration } from './shapes/constants';
import { Box, SxProps, Theme } from '@mui/material';
import { v4 } from 'uuid';

type SlideAnimationProps = {
  children: React.ReactNode;
  startingPercentage?: number;
};

export const SlideAnimation = ({
  children,
  startingPercentage = 0,
}: SlideAnimationProps) => {
  const initialTranslation = startingPercentage
    ? `calc(${startingPercentage}vh - ${VERTICAL_SPREAD}px)`
    : `100vh`;
  const ref = useRef(v4());
  // const durationMultiplier = startingPercentage ? startingPercentage / 100 : 1;
  const containerStyle: SxProps<Theme> = {
    position: 'absolute',
    height: VERTICAL_SPREAD,
    width: '100%',
    boxSizing: 'border-box',
    transform: `translate(0, ${initialTranslation})`,
    '@keyframes slide': {
      '0%': {
        transform: `translate(0, ${initialTranslation})`,
      },
      '100%': {
        transform: `translate(0, -${VERTICAL_SPREAD}px)`,
      },
    },
    animation: `slide ${Math.floor(
      getSlideAnimationDuration() / 1000
    )}s linear`,
    // animationPlayState: 'paused',
  };

  return (
    <Box className={ref.current} sx={containerStyle}>
      {children}
    </Box>
  );
};
