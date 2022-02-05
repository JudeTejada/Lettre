import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useSWR, { useSWRConfig } from 'swr';
import QRCode from 'qrcode.react';
import { useEditor, JSONContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import toast from 'react-hot-toast';

import { Button, Input, Label, Tiptap } from '@/components/.';

import { letterState } from '@/atoms/letter';

import { handleValidation, submitLetter } from './util';

export const FormMessage = () => {
  const [formStep, setFormStep] = useState(1);
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR('/api/create');

  const setLetterState = useSetRecoilState(letterState);

  const letterData = useRecoilValue(letterState);
  const editor = useEditor({
    extensions: [
      StarterKit,

      CharacterCount,
      Placeholder.configure({
        emptyEditorClass: 'tiptap-editor-is-empty',
        placeholder: 'Express your thought here...'
      })
    ],

    onUpdate: ({ editor }) => {
      handleEditorChange(editor.getJSON());
    }
  });

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
  }, [data]);

  const handleEditorChange = (message: JSONContent) => {
    setLetterState(letter => ({ ...letter, message: JSON.stringify(message) }));
  };

  const nextFormStep = async () => {
    const isSuccess = handleValidation(letterData, formStep);
    if (!isSuccess) return;

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

  if (!editor) return <h1>Loading...</h1>;

  return (
    <div>
      <h1 className='mb-6 text-3xl font-bold text-center font-charter'>
        To someone special
      </h1>

      {formStep === 1 && <FirstStep editor={editor} />}
      {formStep === 2 && <SecondStep />}
      {formStep === 3 && <ThirdStep data={data} />}

      {formStep !== 3 && (
        <div className='absolute inset-x-0 bottom-0 w-full p-2 '>
          <div className='flex items-center justify-between px-10 mx-auto md:px-40'>
            <p>{editor.storage.characterCount.words()} words spoken </p>
            <div className='flex flex-row items-center gap-4'>
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
          </div>
        </div>
      )}
    </div>
  );
};

const FirstStep = ({ editor }: { editor: Editor }) => {
  return (
    <form className={clsx('mb-4')}>
      <fieldset className='flex flex-col mb-6 '>
        <Label htmlFor='message'>Craft your message</Label>
        <Tiptap editor={editor} />
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
      <h1>Present this to your Special person </h1>;
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
