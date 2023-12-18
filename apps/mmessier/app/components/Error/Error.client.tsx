import { useStyles } from '../../hooks/useStyles';
import { styles as ErrorStyles } from './Error.styles';

export const ErrorContainer = ({ children }: { children: React.ReactNode }) => {
  const styles = useStyles(ErrorStyles);
  return <div style={styles.static?.container}>{children}</div>;
};
