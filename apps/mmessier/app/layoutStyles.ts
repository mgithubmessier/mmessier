import { Style } from '../types';
import { colors } from './styles/colors';

export const styles: Style = {
  body: {
    height: '100vh',
    width: '100%',
    margin: 0,
    backgroundColor: colors.background.main,
  },
  container: { display: 'flex', flexDirection: 'column', height: '100%' },
  childContainer: {
    flex: 1,
    display: 'flex',
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
    padding: 24,
  },
};
