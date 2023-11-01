import { Checkbox, Paper, ThemeProvider, Typography } from '@mui/material';
import { Navbar } from './components/Navbar/Navbar.client';
import { Style } from '../types';
import { theme } from './styles/theme';
import { colors } from './styles/colors';

const styles: Style = {
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <body style={styles.body}>
          <div style={styles.container}>
            <Typography variant="h1">Matthew Messier</Typography>
            <Navbar />
            <Paper style={styles.childContainer}>{children}</Paper>
          </div>
        </body>
      </html>
    </ThemeProvider>
  );
}
