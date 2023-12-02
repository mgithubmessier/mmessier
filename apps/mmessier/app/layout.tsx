import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';
import { BreakpointListener } from './components/BreakpointListener/BreakpointListener';
import { LayoutClient } from './layout.client';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <BreakpointListener />
      <html lang="en">
        <LayoutClient>{children}</LayoutClient>
      </html>
    </ThemeProvider>
  );
}
