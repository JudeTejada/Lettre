import type { NextPage } from 'next';
import Head from 'next/head';

import { FormMessage } from '@/components/.';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lettre - Create A Letter</title>
        <meta
          name='description'
          content='Send a letter to a special person using with a QR Code '
        />
        <meta property='og:title' content='Lettre' />
        <meta
          property='og:description'
          content='Send a letter to a special person using with a QR Code'
        />
        <meta
          property='og:url'
          content={`${process.env.NEXT_PUBLIC_WEBSITE_URL}`}
        />
        <meta property='og:type' content='website' />
      </Head>
      <div className='relative min-h-screen bg-primary-bg'>
        <FormMessage />
      </div>
    </>
  );
};

export default Home;
