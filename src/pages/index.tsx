import type { NextPage } from 'next';

import { FormMessage } from '@/components/.';

const Home: NextPage = () => {
  return (
    <div className='relative min-h-screen bg-primary-bg'>
      <div className='container flex flex-col px-10 py-20 mx-auto md:px-40 '>
        <FormMessage />
      </div>
    </div>
  );
};

export default Home;
