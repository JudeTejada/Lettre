import type { NextPage } from 'next';
import clsx from 'clsx';
import { useState } from 'react';

import { Button, Input, Label } from '@/components/.';

const Home: NextPage = () => {
  const [stepper, setStepper] = useState(0);
  return (
    <div className='min-h-screen bg-primary-bg'>
      <div className='container flex flex-col px-20 py-10 mx-auto md:px-10 '>
        <h1 className='mb-6 text-3xl font-bold text-center font-charter'>
          Send a message to a special person 💙
        </h1>

        <form
          className={clsx('px-8 pt-6 pb-8 mb-4  ', stepper === 1 && 'hidden')}
          aria-hidden={stepper === 1}
        >
          <fieldset className='flex flex-col mb-6 '>
            <Label htmlFor='message'>Craft your message</Label>
            <div className='text-lg font-charter'>
              {/* <TextEditor /> */}
              <h1>text editor</h1>
            </div>
          </fieldset>
          <Button
            name='_action'
            value='firstStep'
            className='w-full text-base mt-15 text-dark'
          >
            Next
          </Button>
        </form>

        <form
          className={clsx('px-8 pt-6 pb-8 mb-4  ', stepper === 0 && 'hidden')}
          method='post'
          aria-hidden={stepper === 0}
        >
          <fieldset className='flex flex-col mb-6 '>
            <label
              htmlFor='sender'
              className='block mb-2 text-base font-bold text-primary-gray'
            >
              Sender
            </label>
            <Input type='text' placeholder='Lee' name='sender' />
          </fieldset>

          <fieldset className='flex flex-col mb-6 '>
            <label
              htmlFor='receiver'
              className='block mb-2 text-base font-bold text-primary-gray'
            >
              Receiver
            </label>
            <Input type='text' placeholder='Lee' name='receiver' />
          </fieldset>

          <Button name='_action' value='secondStep'>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Home;
