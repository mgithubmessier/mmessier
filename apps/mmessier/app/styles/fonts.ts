import {
  Bebas_Neue,
  Yellowtail,
  Barlow_Condensed,
  Hind,
  Cantarell,
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

export const h4Font = Hind({
  subsets: ['latin'],
  weight: '400',
});

export const common = Cantarell({
  subsets: ['latin'],
  weight: '400',
});

export const fonts = {
  h1Font,
  h2Font,
  h3Font,
  h4Font,
  common,
};
