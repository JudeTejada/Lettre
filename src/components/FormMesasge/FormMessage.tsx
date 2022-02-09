import { MouseEventHandler, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useSWR from 'swr';
import { useEditor, JSONContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import toast from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

import { Button } from '@/components/.';

import { letterState } from '@/atoms/letter';

import { handleValidation, submitLetter } from './util';
import { FirstStep, SecondStep, ThirdStep } from './Steps';
import { FormState, Form } from '@/utils/types';

export const FormMessage = () => {
  const [form, setForm] = useState<FormState>({ state: Form.Initial });

  const [formStep, setFormStep] = useState(1);
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
    if (data?.success) setFormStep(currentStep => currentStep + 1);
  }, [data]);

  const handleEditorChange = (message: JSONContent) => {
    setLetterState(letter => ({ ...letter, message: JSON.stringify(message) }));
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setLetterState(letter => ({ ...letter, [e.target.name]: e.target.value }));

  const nextFormStep = async () => {
    const isSuccess = handleValidation(letterData, formStep);
    if (!isSuccess) return;

    if (formStep === 2) {
      try {
        setForm({ state: Form.Loading });
        const res = await submitLetter(letterData);

        setForm({ state: Form.Initial });
      } catch (error) {
        setFormStep(1);
        setForm({ state: Form.Initial });
        throw new Error('Sorry something went wrong');
      }

      return;
    }

    setFormStep(currentStep => currentStep + 1);
  };

  const prevFormStep = () => setFormStep(currentStep => currentStep - 1);

  if (!editor) return <h1>Loading...</h1>;

  return (
    <form>
      <AnimatePresence>
        {formStep === 1 && (
          <FirstStep onChange={handleOnChange} editor={editor} />
        )}
        {formStep === 2 && (
          <SecondStep editor={editor} onChange={handleOnChange} />
        )}
        {formStep === 3 && <ThirdStep data={data} />}
      </AnimatePresence>

      {formStep !== 3 && (
        <FormButtons
          form={form}
          nextFormStep={nextFormStep}
          formStep={formStep}
          prevFormStep={prevFormStep}
          editor={editor}
        />
      )}
    </form>
  );
};

interface formButtonProps {
  nextFormStep: MouseEventHandler<HTMLButtonElement>;
  prevFormStep: MouseEventHandler<HTMLButtonElement>;
  formStep: number;
  editor: Editor;
  form: FormState;
}

const FormButtons = ({
  prevFormStep,
  nextFormStep,
  formStep,
  editor,
  form
}: formButtonProps) => {
  const isLoading = form.state === Form.Loading;

  return (
    <div className='absolute inset-x-0 bottom-0 w-full p-2 '>
      <div className='flex flex-col items-center justify-between px-10 mx-auto md:flex-row md:mx-80'>
        <div className='flex flex-row items-center justify-between w-full gap-4'>
          {formStep !== 1 && (
            <Button buttonType='secondary' onClick={prevFormStep}>
              Back
            </Button>
          )}
          <div />
          {formStep >= 1 && (
            <Button isLoading={isLoading} onClick={nextFormStep}>
              {formStep === 2 ? 'Submit' : ' Next'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
