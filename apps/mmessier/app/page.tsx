import { Metadata } from 'next';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Matthew Messier',
  description: 'I hope this site can help you to get to know me a bit better!',
};
export default async function Index() {
  return (
    <div>
      <Head>
        <title>matthewmessier.com</title>
      </Head>
      <h1>Home</h1>
    </div>
  );
}
