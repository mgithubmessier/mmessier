import { Breakpoint, Style } from '@mmessier/types';
import { spacingLevel } from '../../../styles/spacing';
import { colors } from '../../../styles/colors';

export const styles: Style = (breakpoint: Breakpoint) => ({
  dynamic: {},
  static: {
    container: {
      marginTop: spacingLevel(2, breakpoint),
    },
    inputContainer: {
      marginBottom: spacingLevel(1, breakpoint),
    },
    button: {
      marginTop: spacingLevel(2, breakpoint),
    },
    nameContainer: {
      display: 'flex',
      flexDirection: [Breakpoint.SMALL, Breakpoint.MEDIUM].includes(breakpoint)
        ? 'column'
        : 'row',
    },
    firstNameField: {
      flex: 1,
      marginRight: spacingLevel(0.5, breakpoint),
    },
    lastNameField: {
      flex: 1,
      marginLeft: spacingLevel(0.5, breakpoint),
    },
    text: {
      color: colors.text.main,
    },
  },
});
