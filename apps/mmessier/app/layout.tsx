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
