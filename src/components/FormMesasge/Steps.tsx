import clsx from 'clsx';
import QRCode from 'qrcode.react';
import { Editor } from '@tiptap/react';
import { motion } from 'framer-motion';

import { Button, Input, Label, Tiptap } from '..';

interface BaseStepProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editor: Editor;
}

const FirstStep = ({ editor, onChange }: BaseStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={clsx('mb-4 py-20')}
    >
      <input
        onChange={onChange}
        type='text'
        name='title'
        className='w-full mb-6 text-3xl font-bold text-center bg-transparent appearance-none font-charter focus:outline-none focus:shadow-outline'
        placeholder='Your title'
      />

      <fieldset className='flex flex-col mb-6 '>
        <div className='flex flex-row justify-between w-full'>
          <Label htmlFor='message'>Craft your message</Label>
          <p>{editor.storage.characterCount.words()} words spoken </p>
        </div>
        <Tiptap editor={editor} />
      </fieldset>
    </motion.div>
  );
};
const SecondStep = ({ onChange }: BaseStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={clsx(' mb-4  py-20 ')}
    >
      <fieldset className='flex flex-col mb-6 '>
        <label
          htmlFor='sender'
          className='block mb-2 text-base font-bold text-primary-gray'
        >
          Sender
        </label>

        <Input
          onChange={onChange}
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
          onChange={onChange}
          type='text'
          placeholder='Lee'
          name='receiver'
        />
      </fieldset>
    </motion.div>
  );
};
const ThirdStep = ({ data }: any) => {
  if (!data) return <h1>Something went wrong</h1>;

  const downloadQR = () => {
    const canvas = document.getElementById('qr-id') as HTMLCanvasElement;
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'letter.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='mb-4 text-2xl font-bold'>
        Show this to your Special person{' '}
      </h1>
      <p className='mb-2 text-base'>
        Have them scan with using qr a scanner, copy the value of text and paste
        in on your browser.{' '}
      </p>
      <QRCode
        id='qr-id'
        value={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/${data?.letterId}`}
        size={290}
        level={'H'}
      />
      <Button className='mt-4' onClick={downloadQR}>
        {' '}
        Download QR{' '}
      </Button>
    </div>
  );
};

export { FirstStep, SecondStep, ThirdStep };
