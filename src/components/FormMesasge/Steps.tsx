import { letterState } from '@/atoms/letter';
import clsx from 'clsx';
import QRCode from 'qrcode.react';
import { useSetRecoilState } from 'recoil';
import { Editor } from '@tiptap/react';
import { motion } from 'framer-motion';

import { Button, Input, Label, Tiptap } from '..';

interface StepInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FirstStepProps extends StepInputProps {
  editor: Editor;
}

const FirstStep = ({ editor, onChange }: FirstStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={clsx('mb-4')}
    >
      <input
        onChange={onChange}
        type='text'
        name='title'
        className='w-full mb-6 text-3xl font-bold text-center bg-transparent appearance-none font-charter focus:outline-none focus:shadow-outline'
        placeholder='Your title'
      />

      <fieldset className='flex flex-col mb-6 '>
        <Label htmlFor='message'>Craft your message</Label>
        <Tiptap editor={editor} />
      </fieldset>
    </motion.div>
  );
};
const SecondStep = ({ onChange }: StepInputProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={clsx(' mb-4  ')}
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
    <div className='flex flex-col items-center'>
      <h1>Show this to your Special person </h1>;
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
