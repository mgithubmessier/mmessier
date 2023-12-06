import { Typography } from '@mui/material';
import { basicStyles } from './style';
import { Metadata } from 'next';
import { ContactForm } from './components/ContactForm.client';

export const metadata: Metadata = {
  title: 'Matthew Messier',
  description: 'I hope this site can help you to get to know me a bit better!',
};

export const Home = () => {
  return (
    <div style={basicStyles.static?.container}>
      <Typography variant="h2">About</Typography>
      <Typography style={basicStyles.static?.text}>
        This website is written entirely by me, Matthew Messier, in{' '}
        <a
          href="https://react.dev/"
          target="_blank"
          style={basicStyles.static?.link}
        >
          React
        </a>
        /{' '}
        <a
          href="https://nextjs.org/"
          target="_blank"
          style={basicStyles.static?.link}
        >
          NextJS
        </a>
        . It is intended to be a resume, a development sandbox, and a way to
        brag about my band,{' '}
        <a
          target="blank"
          style={basicStyles.static?.link}
          href="https://www.captainsunbeamuniverse.com/"
        >
          🎸 Captain Sunbeam 🎸
        </a>{' '}
        .
      </Typography>
      <Typography style={basicStyles.static?.text}>
        Feel free to use the form below to contact me with questions about my
        projects, opportunities to work with me, or just to say hi.
      </Typography>
      <ContactForm />
    </div>
  );
};

export default Home;
