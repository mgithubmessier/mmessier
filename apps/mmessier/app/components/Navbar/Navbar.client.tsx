'use client';

import { usePathname } from 'next/navigation';
import { Tabs, Tab } from '@mui/material';
import Link from 'next/link';

import { styles } from './Navbar.styles';

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <Tabs variant="fullWidth" value={pathname}>
      <Tab
        label={
          <Link href="/" style={styles.link}>
            Home
          </Link>
        }
        value="/"
      />

      <Tab
        label={
          <Link href="/experience" style={styles.link}>
            Experience
          </Link>
        }
        value="/experience"
      />
    </Tabs>
  );
};
