import type { NextPage } from 'next';
import Link from 'next/link';

import heroImage from '../../public/hero.png';
import { Button, Seo } from '@/components/.';
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <>
      <Seo />

      <div className='container relative flex flex-col items-center justify-center min-h-screen px-10 mx-auto center bg-primary-bg md:flex-row'>
        <div className='flex flex-col items-start mb-16 md:w-2/6 md:mb-0'>
          <h1 className='mb-4 text-4xl font-bold md:text-5xl'>
            Send a letter to someone special
          </h1>
          <p className='mb-8 text-lg'>
            Have a person that want to make their day feel special? craft a
            message and send it to them with a QR code and it will make their
            life joy.
          </p>
          <Link href='/new' passHref>
            <Button>Create a letter</Button>
          </Link>
        </div>
        <div className='w-full md:w-5/12'>
          <Image className='flex-1 w-full' alt='hero image' src={heroImage} />
        </div>
      </div>
    </>
  );
};

export default Home;
