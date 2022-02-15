import type { NextPage } from 'next';

import { FormMessage, Seo } from '@/components/.';

const Home: NextPage = () => {
  return (
    <>
      <Seo title='Create a message - Lettre' />
      <div className='relative min-h-screen bg-primary-bg'>
        <FormMessage />
      </div>
    </>
  );
};

export default Home;
