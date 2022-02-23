import clsx from 'clsx';
import QRCode from 'qrcode.react';
import { Editor } from '@tiptap/react';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import { Button, Input, Label, Tiptap } from '..';
import { letterState } from '@/atoms/letter';

interface BaseStepProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editor: Editor;
}

const FirstStep = ({ editor, onChange }: BaseStepProps) => {
  const { title } = useRecoilValue(letterState);

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={clsx('mb-4 py-20')}
    >
      <input
        required
        defaultValue={title}
        onChange={onChange}
        type='text'
        name='title'
        className='w-full mb-6 text-3xl font-bold text-center bg-transparent appearance-none font-charter focus:outline-none focus:shadow-outline'
        placeholder='Your title'
      />

      <div className='flex flex-col mb-6 '>
        <div className='flex flex-row justify-between w-full'>
          <Label htmlFor='message'>Craft your message</Label>
          <div className='opacity-60'>
            <span>{editor.storage.characterCount.characters()} </span>
            <span className='op'>/ 300 characters </span>
          </div>
        </div>
        <Tiptap editor={editor} />
      </div>
    </motion.form>
  );
};
const SecondStep = ({ onChange }: BaseStepProps) => {
  const { sender, receiver } = useRecoilValue(letterState);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={clsx(' mb-4  py-20 ')}
    >
      <h2 className='mb-4 text-2xl text-center'>
        Fill in the remaining details to complete your message
      </h2>
      <fieldset className='flex flex-col mb-6 '>
        <label
          htmlFor='sender'
          className='block mb-2 text-base font-bold text-primary-gray'
        >
          Sender
        </label>

        <Input
          defaultValue={sender}
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
          defaultValue={receiver}
          onChange={onChange}
          type='text'
          placeholder='John'
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
        Show this to your special person{' '}
      </h1>
      <p className='mb-6 text-base'>
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
