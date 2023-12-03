'use client';

import { CSSProperties, useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { colors } from '../../styles/colors';
import { Container, SxProps } from '@mui/material';

export enum Breakpoint {
  SMALL = 'small',
  MEDIUM = 'medium',
  DEFAULT = 'default',
}

const MAX_SHAPE_SIDE = 100;
const VERTICAL_SHAPE_SPREAD_MULTIPLIER = 3;
const INITIAL_OFFSET = MAX_SHAPE_SIDE * VERTICAL_SHAPE_SPREAD_MULTIPLIER;
const SLIDE_ANIMATION_DURATION = 50000;
const ADDITION_RATE = 4000;

const RandomTriangleShape = () => {
  const depth = Math.floor(Math.random() * 3) + 2;
  const randomRotation = Math.floor(Math.random() * 360);
  const triangleStyle = (currentDepth: number): CSSProperties => {
    const multiple = MAX_SHAPE_SIDE / depth;

    const shortSide = (MAX_SHAPE_SIDE - (currentDepth + 1) * multiple) / 2;
    const longSide = shortSide * 2;

    return {
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
  const animation: SxProps<any> = {
    '@keyframes roll': {
      '0%': {
        transform: 'rotate(0)',
      },
      '100%': {
        transform: `rotate(${clockwise ? '-' : ''}360deg)`,
      },
    },
    animation: `roll ${
      Math.floor(Math.random() * 50) + SLIDE_ANIMATION_DURATION / 1000
    }s linear infinite`,
    position: 'relative',
    width: '100%',
    height: '100%',
  };

  return <Container sx={animation}>{triangles}</Container>;
};

type AnimationProps = {
  children: React.ReactNode;
};

const Animation = ({ children }: AnimationProps) => {
  const containerStyle: SxProps<any> = {
    position: 'absolute',
    height: '100%',
    width: '100%',
    '@keyframes slide': {
      '0%': {
        transform: `translate(0, ${INITIAL_OFFSET}px)`,
      },
      '100%': {
        transform: `translate(0, calc(-100vh - ${INITIAL_OFFSET}px))`,
      },
    },

    animation: `slide ${SLIDE_ANIMATION_DURATION / 1000}s linear infinite`,
  };

  return <Container sx={containerStyle}>{children}</Container>;
};

const RandomShapeSpread = () => {
  console.log('why the fuck is this rerendering');
  const maxShapes =
    Math.floor(Math.random() * (window.innerWidth / MAX_SHAPE_SIDE)) + 1;

  const numShapes = Math.floor(Math.random() * maxShapes) + 1;

  const maxSpaceBetweenShapes = Math.floor(window.innerWidth / numShapes);

  const shapes = [];

  for (let i = 0; i < numShapes; i++) {
    const style: CSSProperties = {
      height: MAX_SHAPE_SIDE,
      width: MAX_SHAPE_SIDE,
      position: 'absolute',
      bottom: -Math.floor(Math.random() * INITIAL_OFFSET),
      left:
        Math.floor(Math.random() * maxSpaceBetweenShapes) +
        maxSpaceBetweenShapes * i,
    };
    shapes.push(
      <div key={i} style={style}>
        <RandomTriangleShape />
      </div>
    );
  }

  return <Animation>{shapes}</Animation>;
};

export const DriftingShapesClient = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shapes, setShapes] = useState<Array<React.ReactNode>>([]);

  useEffect(() => {
    const removeShapes = () => {
      setTimeout(() => {
        setShapes((s) => {
          s.shift();
          return s;
        });
        removeShapes();
      }, ADDITION_RATE);
    };
    const addShapes = () => {
      setTimeout(() => {
        setShapes((s) => {
          return [...s, <RandomShapeSpread key={v4()} />];
        });
        addShapes();
      }, ADDITION_RATE);
    };
    addShapes();
    setTimeout(removeShapes, SLIDE_ANIMATION_DURATION);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: '100%',
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 1,
      }}
      className="Drifting-Shapes-Client"
    >
      {shapes}
    </div>
  );
};
