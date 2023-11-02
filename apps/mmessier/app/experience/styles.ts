import { Style } from '../../types';

const BUTTON_HEIGHT = 90;

export const styles: Style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'unset',
  },
  button: {
    textTransform: 'none',
    display: 'flex',
    width: '80%',
    padding: 0,
    height: BUTTON_HEIGHT,
  },
  buttonTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  companyLogo: {
    height: 50,
  },
  companyLogoContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'white',
    height: BUTTON_HEIGHT,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
