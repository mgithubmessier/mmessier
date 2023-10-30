import { Typography } from '@mui/material';
import { Navbar } from './components/Navbar/Navbar.client';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Typography variant="h1">Matthew Messier</Typography>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
