'use client';

import { usePathname } from 'next/navigation';
import { Tabs, Tab } from '@mui/material';
import Link from 'next/link';

import { styles as navbarStyles } from './Navbar.styles';
import { useStyles } from '../../hooks/useStyles';

export const NavbarClient = () => {
  const pathname = usePathname();
  const styles = useStyles(navbarStyles);

  return (
    <Tabs variant="fullWidth" value={pathname.split('/').slice(0, 2).join('/')}>
      <Tab
        label={
          <Link href="/" style={styles.static?.link}>
            Home
          </Link>
        }
        value="/"
      />

      <Tab
        label={
          <Link href="/experience" style={styles.static?.link}>
            Experience
          </Link>
        }
        value="/experience"
      />

      <Tab
        label={
          <Link href="/projects" style={styles.static?.link}>
            Projects
          </Link>
        }
        value="/projects"
      />
    </Tabs>
  );
};
