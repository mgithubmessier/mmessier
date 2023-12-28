import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';
import { BreakpointListener } from './components/BreakpointListener/BreakpointListener';
import { LayoutClient } from './layout.client';
import { configuration } from '../configuration/configuration';

import { headers } from 'next/headers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ip =
    process.env.NODE_ENV === 'development'
      ? '121.0.0.1'
      : headers().get('x-forwarded-for') || '';

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
