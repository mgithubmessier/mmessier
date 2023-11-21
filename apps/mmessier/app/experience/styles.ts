import { CSSProperties } from 'react';
import { Style } from '../../types';
import { colors } from '../styles/colors';
import { spacingLevel } from '../styles/spacing';
import { fonts } from '../styles/fonts';

const link: CSSProperties = {
  textDecoration: 'none',
  color: 'unset',
};

const buttonTextTitleContainer: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flex: 1,
};

const button: CSSProperties = {
  textTransform: 'none',
  display: 'flex',
  width: '80%',
  padding: 0,
  margin: '3px 0',
};

const dateRangeText = {
  ...fonts.common.style,
};

const IMAGE_PADDING = spacingLevel(1);
const LOGO_SIDE = 70;

const companyLogoContainer: CSSProperties = {
  position: 'relative',
  width: LOGO_SIDE,
  minWidth: LOGO_SIDE,
  height: LOGO_SIDE,
  minHeight: LOGO_SIDE,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: spacingLevel(1),
};

export const styles: Style = {
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
          ...buttonTextTitleContainer,
          marginLeft: spacingLevel(2),
          textAlign: 'left',
        };
      }
      return {
        ...buttonTextTitleContainer,
        marginRight: spacingLevel(2),
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
    alternatingCompanyLogoContainer: (isEven: boolean) => {
      if (isEven) {
        return {
          ...companyLogoContainer,
          borderTopLeftRadius: 6,
          borderBottomLeftRadius: 6,
        };
      }
      return {
        ...companyLogoContainer,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
      };
    },
  },
  static: {
    buttonTextContainer: {
      display: 'flex',
      justifyContent: 'center',
      flex: 1,
      margin: spacingLevel(1),
    },
    dateRangeContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
    },
    dateRangeText,
    dateRangeSplit: {
      ...dateRangeText,
      margin: `0 ${spacingLevel(1)}px`,
    },
    heading: {
      marginBottom: 12,
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      maxWidth: 1000,
    },
    imageContainer: {
      backgroundColor: 'white',
      width: LOGO_SIDE + IMAGE_PADDING,
      height: LOGO_SIDE + IMAGE_PADDING,
    },
    companyLogo: {
      objectFit: 'contain',
    },
  },
};
