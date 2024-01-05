'use client';

import { Button, Container } from '@mui/material';
import Link from 'next/link';
import { useStyles } from '../../hooks/useStyles';

import {
  getTriangleSideLength,
  styles as triangleNavigationStyles,
} from './styles';
import { useState } from 'react';
import { OnResize, Responsive } from '../../components/Responsive';
import { useBreakpointState } from '../../zustand/BreakpointState/BreakpointState';

/**
 * TODO
 * Paginate the rows after there is more than 2
 *
 */

type TriangleNavigationItemProps = {
  title: string;
  link: string;
  index?: number;
  rowIndex?: number;
};

const TriangleNavigationItem = ({
  title,
  link,
  index,
  rowIndex,
}: TriangleNavigationItemProps) => {
  const styles = useStyles(triangleNavigationStyles);
  const [isHovering, setIsHovering] = useState(false);
  return (
    <Container
      style={{
        ...styles.dynamic?.triangleContainer(index, rowIndex),
        ...(isHovering ? styles.static?.scaleUp : {}),
      }}
    >
      <Container
        onMouseLeave={() => {
          setIsHovering(false);
        }}
        onMouseEnter={() => {
          setIsHovering(true);
        }}
        style={styles.dynamic?.triangleContent(index, rowIndex)}
      >
        <Link href={link}>
          <Button style={{ width: '100%' }}>{title}</Button>
        </Link>
      </Container>
    </Container>
  );
};

type TriangleNavigationProps = {
  items: Array<TriangleNavigationItemProps>;
};

export const TriangleNavigation = ({ items }: TriangleNavigationProps) => {
  const breakpoint = useBreakpointState().currentBreakpoint;
  const styles = triangleNavigationStyles(breakpoint);
  const [trianglesPerRow, setTrianglesPerRow] = useState(0);
  const onResize: OnResize = (rect, status) => {
    console.log('ON RESIZE', rect, status);
    if (rect) {
      const PADDING_ESTIMATE = 20;
      // subtracting one because the triangles overlap each other's halves
      const trianglesPerRow =
        Math.floor(
          rect.width /
            ((getTriangleSideLength(breakpoint) + PADDING_ESTIMATE) / 2)
        ) - 1;
      setTrianglesPerRow(trianglesPerRow > 0 ? trianglesPerRow : 1);
    }
  };

  const triangleRows: Array<React.ReactNode> = [];
  const numRows = Math.ceil(
    trianglesPerRow ? items.length / trianglesPerRow : 0
  );
  for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
    const startIndex = rowIndex * trianglesPerRow;
    triangleRows.push(
      <div style={styles.static?.triangleRow} key={`triangleRow-${rowIndex}`}>
        {items
          .slice(startIndex, startIndex + trianglesPerRow)
          .map((item, index) => {
            return (
              <TriangleNavigationItem
                key={item.title}
                {...item}
                index={index}
                rowIndex={rowIndex}
              />
            );
          })}
      </div>
    );
  }

  return (
    <Responsive style={styles.static?.container} onResize={onResize}>
      {triangleRows}
    </Responsive>
  );
};
