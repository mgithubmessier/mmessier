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
  const maxShapes =
    Math.floor(Math.random() * (window.innerWidth / MAX_SHAPE_SIDE)) + 3;

  const numShapes = Math.floor(Math.random() * maxShapes) + 1;

  const maxSpaceBetweenShapes = Math.floor(window.innerWidth / numShapes);

  const shapes = [];

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
    shapes.push(
      <div key={i} style={style}>
        <ShapeOption />
      </div>
    );
  }

  return (
    <SlideAnimation startingPercentage={startingPercentage}>
      {shapes}
    </SlideAnimation>
  );
};

export const DriftingShapesClient = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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
  const [shapes, setShapes] = useState<Array<React.ReactNode>>(initialShapes);

  useEffect(() => {
    const addShapeSpread = () => {
      setTimeout(() => {
        setShapes((s) => {
          return [...s.slice(1), <RandomShapeSpread key={v4()} />];
        });
        addShapeSpread();
      }, ADDITION_RATE);
    };
    addShapeSpread();
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
        overflow: 'hidden',
      }}
      className="Drifting-Shapes-Client"
    >
      {shapes}
    </div>
  );
};
