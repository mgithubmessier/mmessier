'use client';

import { Button, Container, Pagination } from '@mui/material';
import Link from 'next/link';
import { useStyles } from '../../hooks/useStyles';

import {
  getTriangleSideLength,
  styles as triangleNavigationStyles,
} from './styles';
import { useCallback, useState } from 'react';
import { OnResize, Responsive } from '../../components/Responsive';
import { useBreakpointState } from '../../zustand/BreakpointState/BreakpointState';
import { BasicStyle } from '@mmessier/types';

const MAX_TRIANGLE_ROWS = 2;

type TriangleNavigationItemProps = {
  title: string;
  link: string;
  gifPath?: string;
  index?: number;
  rowIndex?: number;
};

const TriangleNavigationItem = ({
  title,
  link,
  index,
  gifPath,
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
          <Button
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: isHovering ? `url(${gifPath})` : 'unset',
              backgroundSize: '100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          >
            {isHovering ? '' : title}
          </Button>
        </Link>
      </Container>
    </Container>
  );
};

type GeneratedTriangleRows = {
  triangleRows: Array<React.ReactNode>;
  pages: number;
};

const generateTriangleRows = (
  trianglesPerRow: number,
  items: Array<TriangleNavigationItemProps>,
  page: number,
  styles: BasicStyle
): GeneratedTriangleRows => {
  const triangleRows: Array<React.ReactNode> = [];
  let numRows = Math.ceil(trianglesPerRow ? items.length / trianglesPerRow : 0);
  let totalPages = 1;
  if (numRows > MAX_TRIANGLE_ROWS) {
    totalPages = Math.ceil(numRows / MAX_TRIANGLE_ROWS);
    numRows = MAX_TRIANGLE_ROWS;
  }
  for (let rowIndex = page - 1; rowIndex < numRows; rowIndex++) {
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
  return {
    triangleRows,
    pages: totalPages,
  };
};

type TriangleNavigationProps = {
  items: Array<TriangleNavigationItemProps>;
};

export const TriangleNavigation = ({ items }: TriangleNavigationProps) => {
  const breakpoint = useBreakpointState().currentBreakpoint;
  const styles = triangleNavigationStyles(breakpoint);
  const [trianglesPerRow, setTrianglesPerRow] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const onResize: OnResize = useCallback(
    (rect, status) => {
      if (rect) {
        const PADDING_ESTIMATE = 20;
        // subtracting one because the triangles overlap each other's halves
        const approximateTriangleSide =
          (getTriangleSideLength(breakpoint) + PADDING_ESTIMATE) / 2;
        const newTrianglesPerRow =
          Math.floor(rect.width / approximateTriangleSide) - 1;
        if (newTrianglesPerRow !== trianglesPerRow) {
          setTrianglesPerRow(newTrianglesPerRow > 0 ? newTrianglesPerRow : 1);
          setCurrentPage(1);
        }
      }
    },
    [breakpoint]
  );

  const { triangleRows, pages } = generateTriangleRows(
    trianglesPerRow,
    items,
    currentPage,
    styles
  );

  return (
    <div style={styles.static?.container}>
      <Responsive
        style={styles.static?.responsiveContainer}
        onResize={onResize}
      >
        {triangleRows}
      </Responsive>
      {pages > 1 ? (
        <Pagination
          page={currentPage}
          count={pages}
          onChange={(_, newPage) => {
            setCurrentPage(newPage);
          }}
        />
      ) : null}
    </div>
  );
};
