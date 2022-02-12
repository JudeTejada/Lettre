import type { NextPage } from 'next';

import { FormMessage } from '@/components/.';

const Home: NextPage = () => {
  return (
    <div className='relative min-h-screen bg-primary-bg'>
      <FormMessage />
    </div>
  );
};

export default Home;
