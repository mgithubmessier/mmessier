import { CSSProperties } from 'react';
import { Style } from '../../types';
import { colors } from '../styles/colors';

const BUTTON_HEIGHT = 90;

const link: CSSProperties = {
  textDecoration: 'none',
  color: 'unset',
};

const buttonTextContainer: CSSProperties = {
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
  height: BUTTON_HEIGHT,
};

const companyLogoContainer: CSSProperties = {
  paddingLeft: 16,
  paddingRight: 16,
  backgroundColor: 'white',
  height: BUTTON_HEIGHT,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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
          ...buttonTextContainer,
          marginLeft: 16,
        };
      }
      return {
        ...buttonTextContainer,
        marginRight: 16,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      };
    },
    alternatingButton: (isEven: boolean, index: number) => {
      if (isEven) {
        return {
          ...colors.alternating[index % 5],
          ...button,
        };
      }
      return {
        ...button,
        ...colors.alternating[index % 5],
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
    container: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },

    companyLogo: {
      height: 50,
    },
  },
};
