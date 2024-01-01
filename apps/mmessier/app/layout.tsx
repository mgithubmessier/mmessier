import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';
import { BreakpointListener } from './components/BreakpointListener/BreakpointListener';
import { LayoutClient } from './layout.client';
import { configuration } from '../configuration/configuration';

import { getClientIPAddress } from './utilities/ip';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ip = getClientIPAddress();

  return (
    <ThemeProvider theme={theme}>
      <BreakpointListener />
      <html lang="en">
        <LayoutClient commitHash={configuration.commitHash} ip={ip}>
          {children}
        </LayoutClient>
      </html>
    </ThemeProvider>
  );
}
