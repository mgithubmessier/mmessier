import { Checkbox, Paper, ThemeProvider, Typography } from '@mui/material';
import { Navbar } from './components/Navbar/Navbar.client';
import { theme } from './styles/theme';
import { styles } from './layoutStyles';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <body style={styles.static?.body}>
          <div style={styles.static?.container}>
            <Typography variant="h1">Matthew Messier</Typography>
            <Navbar />
            <Paper style={styles.static?.childContainer}>{children}</Paper>
          </div>
        </body>
      </html>
    </ThemeProvider>
  );
}
