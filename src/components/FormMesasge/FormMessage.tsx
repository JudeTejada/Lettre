import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import type { JSONContent } from '@tiptap/react';
import useSWR, { useSWRConfig } from 'swr';
import QRCode from 'qrcode.react';

import toast, { Toaster } from 'react-hot-toast';

import { Button, Input, Label, Tiptap } from '@/components/.';

import { letterState } from '@/atoms/letter';

import { submitLetter } from './util';

export const FormMessage = () => {
  const [formStep, setFormStep] = useState(1);
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR('/api/create');

  const letterData = useRecoilValue(letterState);

  useEffect(() => {
    if (error) {
      toast('Oops! Something went wrong ❌');
      setFormStep(1);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setFormStep(currentStep => currentStep + 1);
    }
    // Object { letterId: "79adb862-e75b-46a0-becf-71b5c79e37bc" }
  }, [data]);

  const nextFormStep = async () => {
    handleValidation(letterData, formStep);

    if (formStep === 2) {
      try {
        mutate('/api/create', submitLetter(letterData));
      } catch (error) {
        setFormStep(1);
        throw new Error('Sorry something went wrong');
      }

      return;
    }

    setFormStep(currentStep => currentStep + 1);
  };

  const prevFormStep = () => setFormStep(currentStep => currentStep - 1);

  return (
    <div className='relative'>
      <h1 className='mb-6 text-3xl font-bold text-center font-charter'>
        To someone special
      </h1>
      {formStep === 1 && <FirstStep />}
      {formStep === 2 && <SecondStep />}
      {formStep === 3 && <ThirdStep data={data} />}

      {formStep !== 3 && (
        <div className='flex justify-between'>
          {formStep !== 1 && (
            <Button buttonType='secondary' onClick={prevFormStep}>
              Back
            </Button>
          )}
          <div />
          {formStep >= 1 && (
            <Button onClick={nextFormStep}>
              {formStep === 2 ? 'Submit' : ' Next'}{' '}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

const FirstStep = () => {
  const setLetterState = useSetRecoilState(letterState);

  const handleEditorChange = (message: JSONContent) => {
    setLetterState(letter => ({ ...letter, message: JSON.stringify(message) }));
  };

  return (
    <form className={clsx(' mb-4  ')}>
      <fieldset className='flex flex-col mb-6 '>
        <Label htmlFor='message'>Craft your message</Label>
        <Tiptap onChange={handleEditorChange} />
      </fieldset>
    </form>
  );
};
const SecondStep = () => {
  const setLetterState = useSetRecoilState(letterState);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setLetterState(letter => ({ ...letter, [e.target.name]: e.target.value }));

  return (
    <div className={clsx(' mb-4  ')}>
      <fieldset className='flex flex-col mb-6 '>
        <label
          htmlFor='sender'
          className='block mb-2 text-base font-bold text-primary-gray'
        >
          Sender
        </label>
        <Input
          onChange={handleOnChange}
          type='text'
          placeholder='Lee'
          name='sender'
        />
      </fieldset>

      <fieldset className='flex flex-col mb-6 '>
        <label
          htmlFor='receiver'
          className='block mb-2 text-base font-bold text-primary-gray'
        >
          Receiver
        </label>
        <Input
          onChange={handleOnChange}
          type='text'
          placeholder='Lee'
          name='receiver'
        />
      </fieldset>
    </div>
  );
};
const ThirdStep = ({ data }: any) => {
  if (!data?.letterId) return <h1>Something went wrong</h1>;

  const downloadQR = () => {
    const canvas = document.getElementById('qr-id');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = '123456.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
      <h1>Present this to your Special person </h1>;
      <QRCode id='qr-id' value={data?.letterId} size={290} level={'H'} />
      <a onClick={downloadQR}> Download QR </a>
    </>
  );
};
