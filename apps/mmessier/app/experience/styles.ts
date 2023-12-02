import { CSSProperties } from 'react';
import { Breakpoint, Style } from '../../types';
import { colors } from '../styles/colors';
import { spacingLevel } from '../styles/spacing';
import { fonts } from '../styles/fonts';
import { SxProps } from '@mui/material';

export const buttonSX: SxProps = {
  transition: 'transform 0.2s',
  '&:hover': {
    zIndex: 1,
    transform: 'scale(1.05)',
  },
};

const link: CSSProperties = {
  textDecoration: 'none',
  color: 'unset',
};

const buttonTextTitleContainer = (breakpoint: Breakpoint): CSSProperties => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flex: 1,
  padding: `${spacingLevel(3, breakpoint)}px ${spacingLevel(2, breakpoint)}px`,
  overflow: 'hidden',
});

const button: CSSProperties = {
  textTransform: 'none',
  display: 'flex',
  width: '80%',
  padding: 0,
  margin: `3px 0`,
};

const dateRangeText = {
  ...fonts.common.style,
  lineHeight: 1,
};

export const styles: Style = (breakpoint: Breakpoint) => ({
  dynamic: {
    alternatingLink: (isEven: boolean) => {
      if (isEven) {
        return link;
      }
      return {
        ...link,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      };
    },
    alternatingButtonTextContainer: (isEven: boolean) => {
      if (isEven) {
        return {
          ...buttonTextTitleContainer(breakpoint),
          textAlign: 'left',
        };
      }
      return {
        ...buttonTextTitleContainer(breakpoint),
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        textAlign: 'right',
      };
    },
    alternatingButton: (isEven: boolean, index: number, numItems: number) => {
      if (isEven) {
        return {
          ...colors.alternating[index % colors.alternating.length],
          ...button,
        };
      }
      return {
        ...button,
        ...colors.alternating[index % colors.alternating.length],
        flexDirection: 'row-reverse',
      };
    },
  },
  static: {
    titleContainer: {
      width: '100%',
    },
    dateRangeContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dateRangeText,
    dateRangeSplit: {
      ...dateRangeText,
      padding: `0 ${spacingLevel(1, breakpoint)}px`,
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      flex: 1,
    },
    widgetContainer: {
      maxWidth: 1000,
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    companyLogo: {
      objectFit: 'contain',
    },
  },
});
