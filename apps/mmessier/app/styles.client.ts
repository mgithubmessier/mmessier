import { Style, Breakpoint } from '@mmessier/types';
import { colors } from './styles/colors';
import { spacingLevel } from './styles/spacing';
import { h2MediaQueries } from './styles/fonts';

const ImageSizing = {
  [Breakpoint.SMALL]: 50,
  [Breakpoint.MEDIUM]: 100,
  [Breakpoint.DEFAULT]: 150,
};

export const styles: Style = (breakpoint: Breakpoint) => {
  const borderWidth = spacingLevel(1, breakpoint);

  return {
    static: {
      commitHash: {
        opacity: 0.5,
      },
      headingContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: spacingLevel(1, breakpoint),
      },
      imageContainer: {
        position: 'relative',
        minWidth: ImageSizing[breakpoint], // + borderWidth * 2,
        minHeight: ImageSizing[breakpoint], // + borderWidth * 2,
        marginRight: borderWidth * 2 + spacingLevel(2, breakpoint),
        marginTop: borderWidth * 2 + spacingLevel(1, breakpoint),
        marginBottom: borderWidth * 2 + spacingLevel(1, breakpoint),
      },
      image: {
        borderWidth,
        borderColor: colors.text.main,
        borderStyle: 'solid',
        borderRadius: '100%',
        objectFit: 'contain',
      },
      body: {
        height: '100vh',
        margin: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        padding: `0 ${spacingLevel(3, breakpoint)}px`,
        backgroundColor: colors.background.main,
      },
      childContainer: {
        flex: 1,
        display: 'flex',
        marginBottom: spacingLevel(3, breakpoint),
        padding: spacingLevel(3, breakpoint),
      },
      container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        flex: 1,
        zIndex: 2,
      },
      platformIconContainer: {
        display: 'flex',
        alignItems: 'center',
      },
    },
    sx: {
      platformIcon: {
        color: colors.text.main,
        ...h2MediaQueries,
      },
    },
  };
};
