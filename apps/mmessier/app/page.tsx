import { Metadata } from 'next';

import Home from './home/page';

export const metadata: Metadata = {
  title: 'Matthew Messier',
  description: 'I hope this site can help you to get to know me a bit better!',
};

export default async function Index() {
  return <Home />;
}
