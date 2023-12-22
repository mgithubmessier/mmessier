import {
  Bebas_Neue,
  Yellowtail,
  Barlow_Condensed,
  Cantarell,
  Rajdhani,
} from 'next/font/google';

export const h1Font = Yellowtail({
  subsets: ['latin'],
  weight: '400',
});

export const h2Font = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
});

export const h3Font = Barlow_Condensed({
  subsets: ['latin'],
  weight: '400',
});

export const h4Font = Rajdhani({
  subsets: ['latin'],
  weight: '400',
});

export const common = Cantarell({
  subsets: ['latin'],
  weight: '400',
});

export const h1MediaQueries = {
  fontSize: '3rem',
  '@media (min-width:400px)': {
    fontSize: '4rem',
  },
  '@media (min-width:600px)': {
    fontSize: '6rem',
  },
};

export const h2MediaQueries = {
  fontSize: '2rem',
  '@media (min-width:400px)': {
    fontSize: '3rem',
  },
  '@media (min-width:600px)': {
    fontSize: '4rem',
  },
};

export const h3MediaQueries = {
  fontSize: '1.5rem',
  '@media (min-width:400px)': {
    fontSize: '2rem',
  },
  '@media (min-width:600px)': {
    fontSize: '2.5rem',
  },
};

export const h4MediaQueries = {
  fontSize: '1rem',
  '@media (min-width:400px)': {
    fontSize: '1.25rem',
  },
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
};

export const fonts = {
  h1Font,
  h2Font,
  h3Font,
  h4Font,
  common,
};
