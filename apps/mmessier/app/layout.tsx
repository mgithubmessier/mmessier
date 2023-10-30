import { Typography } from '@mui/material';
import { Navbar } from './components/Navbar/Navbar.client';
import { Style } from '../types';

const styles: Style = {
  body: {
    height: '100vh',
    width: '100%',
    margin: 0,
  },
  container: { display: 'flex', flexDirection: 'column', height: '100%' },
  childContainer: { flex: 1 },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={styles.body}>
        <div style={styles.container}>
          <Typography variant="h1">Matthew Messier</Typography>
          <Navbar />
          <div style={styles.childContainer}>{children}</div>
        </div>
      </body>
    </html>
  );
}
