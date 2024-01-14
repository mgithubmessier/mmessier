import { Breakpoint, Style } from '@mmessier/types';
import { colors } from '../../styles/colors';
import { spacingLevel } from '../../styles/spacing';

export const getTriangleSideLength = (breakpoint: Breakpoint) => {
  if (breakpoint === Breakpoint.DEFAULT) {
    return 250;
  }
  if (breakpoint === Breakpoint.MEDIUM) {
    return 225;
  }
  return 200;
};

export const styles: Style = (breakpoint: Breakpoint) => ({
  static: {
    container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    triangleRow: {
      display: 'flex',
      marginBottom: spacingLevel(3, breakpoint),
    },
    scaleUp: {
      transform: 'scale(1.2)',
    },
  },
  dynamic: {
    triangleContent: (index: number, rowIndex: number) => {
      const CONTENT_WIDTH = 100;
      const CONTENT_HEIGHT = 80;
      const isEvenColumn = index % 2 === 0;
      const isEvenRow = rowIndex % 2 === 0;
      const flip = isEvenRow ? isEvenColumn : !isEvenColumn;
      const traingleSideLength = getTriangleSideLength(breakpoint);
      const xOffset = -CONTENT_WIDTH / 2;
      const yOffsetRaw = traingleSideLength / 2;
      const yOffset = flip ? yOffsetRaw : -(yOffsetRaw + CONTENT_HEIGHT);
      return {
        pointerEvents: 'all',
        width: CONTENT_WIDTH,
        height: CONTENT_HEIGHT,
        padding: 0,
        transform: `translate(${xOffset}px, ${yOffset}px)`, // to account for the width & height of the text
      };
    },

    triangleContainer: (index: number, rowIndex: number) => {
      const isEvenColumn = index % 2 === 0;
      const isEvenRow = rowIndex % 2 === 0;
      const flip = isEvenRow ? isEvenColumn : !isEvenColumn;

      const traingleSideLength = getTriangleSideLength(breakpoint);
      const shortSide = traingleSideLength / 2;
      return {
        pointerEvents: 'none',
        margin: 0,
        transition: 'transform 0.3s',
        padding: 0,
        position: 'relative',
        left:
          (-1 * index * traingleSideLength +
            spacingLevel(6, breakpoint) * index) /
          2,
        width: 0,
        height: 0,
        borderLeft: `${shortSide}px solid transparent`,
        borderRight: `${shortSide}px solid transparent`,
        borderBottom: flip
          ? `${traingleSideLength}px solid ${
              colors.alternating[index % colors.alternating.length]
                .backgroundColor
            }`
          : 'unset',
        borderTop: flip
          ? 'unset'
          : `${traingleSideLength}px solid ${
              colors.alternating[index % colors.alternating.length]
                .backgroundColor
            }`,
      };
    },
  },
});
