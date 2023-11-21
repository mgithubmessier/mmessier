import { Style } from '../types';
import { colors } from './styles/colors';
import { spacingLevel } from './styles/spacing';

export const styles: Style = {
  static: {
    body: {
      height: '100vh',
      margin: 0,
      marginLeft: 0,
      marginRight: 0,
      marginBottom: 0,
      padding: `0 ${spacingLevel(3)}px`,
      backgroundColor: colors.background.main,
    },
    container: { display: 'flex', flexDirection: 'column', height: '100%' },
    childContainer: {
      flex: 1,
      display: 'flex',
      marginBottom: spacingLevel(3),
      padding: spacingLevel(3),
    },
  },
};
