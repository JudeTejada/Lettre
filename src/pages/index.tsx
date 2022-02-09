import type { NextPage } from 'next';
import Link from 'next/link';

import { FormMessage, Button } from '@/components/.';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lettre</title>
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

      <div className='relative grid min-h-screen place-items-center bg-primary-bg'>
        <div className='container flex flex-col items-center w-3/4 mx-auto '>
          <h1 className='mb-8 text-4xl font-bold'>
            Send a letter to someone special
          </h1>
          <Link href='/new' passHref>
            <Button>Create a letter</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
