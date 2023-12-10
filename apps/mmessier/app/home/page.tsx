import { basicStyles } from './styles';
import { Metadata } from 'next';
import { ContactForm } from './components/ContactForm/ContactForm.client';
import { About } from './components/About/About';

export const metadata: Metadata = {
  title: 'Matthew Messier',
  description: 'I hope this site can help you to get to know me a bit better!',
};

export const Home = () => {
  return (
    <div style={basicStyles.static?.container}>
      <About />
      <ContactForm />
    </div>
  );
};

export default Home;
