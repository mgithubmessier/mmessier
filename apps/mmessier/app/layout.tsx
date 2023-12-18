import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';
import { BreakpointListener } from './components/BreakpointListener/BreakpointListener';
import { LayoutClient } from './layout.client';
import { configuration } from '../configuration/configuration';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <BreakpointListener />
      <html lang="en">
        <LayoutClient commitHash={configuration.commitHash}>
          {children}
        </LayoutClient>
      </html>
    </ThemeProvider>
  );
}
