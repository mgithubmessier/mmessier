import { Breakpoint, Style } from '@mmessier/types';
import { colors } from '../../styles/colors';

const MAX_SHAPE_SIDE = 250;
const shortSide = MAX_SHAPE_SIDE / 2;
const longSide = shortSide * 2;
const CONTENT_WIDTH = MAX_SHAPE_SIDE / 2;

export const styles: Style = (breakpoint: Breakpoint) => ({
  static: {
    container: {
      display: 'flex',
    },
    scaleUp: {
      transform: 'scale(1.2)',
    },
  },
  dynamic: {
    triangleContent: (index: number) => ({
      pointerEvents: 'all',
      position: 'relative',
      left: -MAX_SHAPE_SIDE / 2 + CONTENT_WIDTH / 2 + 10,
      width: 100,
      maxWidth: 100,
      padding: 0,
      top: index % 2 === 0 ? MAX_SHAPE_SIDE / 2 : 'unset',
      bottom:
        index % 2 === 0 ? 'unset' : MAX_SHAPE_SIDE / 2 + CONTENT_WIDTH / 2,
    }),

    triangleContainer: (index: number) => ({
      pointerEvents: 'none',
      transition: 'transform 0.5s',
      padding: 0,
      position: 'relative',
      left: (-1 * index * MAX_SHAPE_SIDE) / 2,
      width: 0,
      height: 0,
      borderLeft: `${shortSide}px solid transparent`,
      borderRight: `${shortSide}px solid transparent`,
      borderBottom:
        index % 2 === 0
          ? `${longSide}px solid ${
              colors.alternating[index % colors.alternating.length]
                .backgroundColor
            }`
          : 'unset',
      borderTop:
        index % 2 === 0
          ? 'unset'
          : `${longSide}px solid ${
              colors.alternating[index % colors.alternating.length]
                .backgroundColor
            }`,
    }),
  },
});
