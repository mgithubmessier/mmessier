import scssColors from './colors.module.scss';

export const colors = {
  alternating: [
    {
      backgroundColor: scssColors.indigo900,
      color: '#FFFFFF',
    },
    {
      backgroundColor: scssColors.indigo800,
      color: '#FFFFFF',
    },
    {
      backgroundColor: scssColors.indigo700,
      color: '#FFFFFF',
    },
    {
      backgroundColor: scssColors.indigo600,
      color: '#FFFFFF',
    },
    {
      backgroundColor: scssColors.indigo200,
      color: '#000000',
    },
    {
      backgroundColor: scssColors.indigo100,
      color: '#000000',
    },
  ],
  text: {
    main: scssColors.indigo50,
  },
  components: {
    main: scssColors.indigo50,
  },
  background: {
    main: scssColors.indigo500,
    secondary: scssColors.indigo400,
    tertiary: scssColors.indigo300,
  },
};
