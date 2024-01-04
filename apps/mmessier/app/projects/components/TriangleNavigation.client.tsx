'use client';

import { Button, Container } from '@mui/material';
import Link from 'next/link';
import { useStyles } from '../../hooks/useStyles';

import { styles as triangleNavigationStyles } from './styles';
import { useState } from 'react';

/**
 * TODO
 * Add a responsive listener that looks at the parent container and determines when the flow triangles to the next line
 * Allow content to be provided from the parent, maybe gifs or any react content generally that playback or just show
 *
 */

type TriangleNavigationItemProps = {
  title: string;
  link: string;
  index?: number;
};

const TriangleNavigationItem = ({
  title,
  link,
  index,
}: TriangleNavigationItemProps) => {
  const styles = useStyles(triangleNavigationStyles);
  const [isHovering, setIsHovering] = useState(false);
  return (
    <Container
      style={{
        ...styles.dynamic?.triangleContainer(index),
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
        style={styles.dynamic?.triangleContent(index)}
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
  const styles = useStyles(triangleNavigationStyles);
  return (
    <div style={styles.static?.container}>
      {items.map((item, index) => {
        return (
          <TriangleNavigationItem key={item.title} {...item} index={index} />
        );
      })}
    </div>
  );
};
