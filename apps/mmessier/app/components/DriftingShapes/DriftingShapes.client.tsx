'use client';

import { CSSProperties, useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import {
  ADDITION_RATE,
  MAX_SHAPE_SIDE,
  VERTICAL_SPREAD,
} from './shapes/constants';
import { RandomTriangleShape } from './shapes/RandomTriangle.client';
import { SlideAnimation } from './SlideAnimation.client';

export enum Breakpoint {
  SMALL = 'small',
  MEDIUM = 'medium',
  DEFAULT = 'default',
}

type RandomShapeSpreadProps = {
  startingPercentage?: number;
};

const RandomShapeSpread = ({ startingPercentage }: RandomShapeSpreadProps) => {
  const [shapes, setShapes] = useState<Array<React.ReactNode>>([]);
  useEffect(() => {
    const minShapes = 5;
    const maxShapes =
      Math.floor(Math.random() * (window.innerWidth / MAX_SHAPE_SIDE)) +
      minShapes;

    const numShapes = Math.floor(Math.random() * maxShapes) + 1;

    const maxSpaceBetweenShapes = Math.floor(window.innerWidth / numShapes);
    const initialShapes: Array<React.ReactNode> = [];

    for (let i = 0; i < numShapes; i++) {
      const shapeOptions = [RandomTriangleShape];
      const ShapeOption =
        shapeOptions[Math.floor(Math.random() * shapeOptions.length)];
      const style: CSSProperties = {
        height: MAX_SHAPE_SIDE,
        width: MAX_SHAPE_SIDE,
        position: 'absolute',
        bottom: Math.floor(Math.random() * VERTICAL_SPREAD) - MAX_SHAPE_SIDE,
        left:
          Math.floor(Math.random() * maxSpaceBetweenShapes) +
          maxSpaceBetweenShapes * i,
      };
      initialShapes.push(
        <div key={i} style={style}>
          <ShapeOption />
        </div>
      );
    }
    setShapes(initialShapes);
  }, []);

  if (!shapes.length) {
    return null;
  }

  return (
    <SlideAnimation startingPercentage={startingPercentage}>
      {shapes}
    </SlideAnimation>
  );
};

export const DriftingShapesClient = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shapes, setShapes] = useState<Array<React.ReactNode>>([]);

  useEffect(() => {
    const initialShapes: Array<React.ReactNode> = [];
    const numInitialShapes = window.innerHeight / VERTICAL_SPREAD;
    for (let i = 0; i < numInitialShapes; i++) {
      initialShapes.push(
        <RandomShapeSpread
          key={v4()}
          startingPercentage={Math.floor(((i + 1) / numInitialShapes) * 100)}
        />
      );
    }
    setShapes(initialShapes);
    const interval = setInterval(() => {
      setShapes((s) => {
        return [...s.slice(1), <RandomShapeSpread key={v4()} />];
      });
    }, ADDITION_RATE);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!shapes.length) {
    return null;
  }

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
        overflow: 'hidden',
      }}
      className="Drifting-Shapes-Client"
    >
      {shapes}
    </div>
  );
};
