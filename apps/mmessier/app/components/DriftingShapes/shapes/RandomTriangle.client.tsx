'use client';

import { CSSProperties } from 'react';
import { MAX_SHAPE_SIDE, getSlideAnimationDuration } from './constants';
import { colors } from '../../../styles/colors';
import { SxProps, Theme, Box } from '@mui/material';

export const RandomTriangleShape = () => {
  const depth = Math.floor(Math.random() * 3) + 2;
  const randomRotation = Math.floor(Math.random() * 360);
  const triangleStyle = (currentDepth: number): CSSProperties => {
    const multiple = MAX_SHAPE_SIDE / depth;

    const shortSide = (MAX_SHAPE_SIDE - currentDepth * multiple) / 2;
    const longSide = shortSide * 2;

    return {
      boxSizing: 'border-box',
      position: 'absolute',
      width: 0,
      height: 0,
      borderLeft: `${shortSide}px solid transparent`,
      borderRight: `${shortSide}px solid transparent`,
      borderBottom: `${longSide}px solid ${colors.alternating[currentDepth].backgroundColor}`,
      bottom: (multiple * currentDepth) / 2,
      left: (multiple * currentDepth) / 2,
      transform: `rotate(${randomRotation}deg)`,
    };
  };

  const triangles = [];
  for (let i = 0; i < depth; i++) {
    triangles.push(<div key={i} style={triangleStyle(i)} />);
  }

  const clockwise = (Math.floor(Math.random() * 2) + 1) % 2;
  const animation: SxProps<Theme> = {
    boxSizing: 'border-box',
    '@keyframes roll': {
      '0%': {
        transform: 'rotate(0)',
      },
      '100%': {
        transform: `rotate(${clockwise ? '-' : ''}360deg)`,
      },
    },
    animation: `roll ${
      Math.floor(Math.random() * 50) + getSlideAnimationDuration() / 1000
    }s linear infinite`,
    position: 'absolute',
    width: '100%',
    height: '100%',
  };

  return <Box sx={animation}>{triangles}</Box>;
};
