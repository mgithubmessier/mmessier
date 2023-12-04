'use client';

import { VERTICAL_SPREAD, getSlideAnimationDuration } from './shapes/constants';
import { Box, SxProps, Theme } from '@mui/material';

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
  const animationName = `slide-${startingPercentage}`;
  const durationMultiplier = startingPercentage ? startingPercentage / 100 : 1;
  const containerStyle: SxProps<Theme> = {
    position: 'absolute',
    height: VERTICAL_SPREAD,
    width: '100%',
    boxSizing: 'border-box',
    opacity: 0,
    [`@keyframes ${animationName}`]: {
      '0%': {
        transform: `translate(0, ${initialTranslation})`,
        opacity: 1,
      },
      '80%': {
        opacity: 0.8,
      },
      '100%': {
        transform: `translate(0, -${VERTICAL_SPREAD}px)`,
        opacity: 0,
      },
    },
    animation: `${animationName} ${Math.floor(
      (getSlideAnimationDuration() / 1000) * durationMultiplier
    )}s linear`,
  };

  return <Box sx={containerStyle}>{children}</Box>;
};
