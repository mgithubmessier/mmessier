'use client';

import { usePathname } from 'next/navigation';
import { Tabs, Tab, Typography } from '@mui/material';
import Link from 'next/link';

import { styles } from './Navbar.styles';

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <Tabs variant="fullWidth" value={pathname.split('/').slice(0, 2).join('/')}>
      <Tab
        label={
          <Link href="/" style={styles.link}>
            <Typography>Home</Typography>
          </Link>
        }
        value="/"
      />

      <Tab
        label={
          <Link href="/experience" style={styles.link}>
            <Typography>Experience</Typography>
          </Link>
        }
        value="/experience"
      />
    </Tabs>
  );
};
