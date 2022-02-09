import { useEditor, EditorContent } from '@tiptap/react';
import { GetServerSideProps } from 'next';
import StarterKit from '@tiptap/starter-kit';
import type { NextPage } from 'next';
import { AnimatePresence, motion } from 'framer-motion';
import { db } from '@/utils/primsa';
import { letter, LetterStep } from '@/utils/types';
import { useState } from 'react';
import { Button } from '../components';

interface letterProps {
  letter: letter;
  setStep: (step: LetterStep) => void;
}

const Letter = ({ letter }: letterProps) => {
  const [step, setStep] = useState<LetterStep>(LetterStep.FIRST);

  if (!letter) return <h1>Loading....</h1>;

  return (
    <div className='grid min-h-screen bg-primary-bg place-items-center'>
      <AnimatePresence>
        {step === LetterStep.FIRST && (
          <FirstStep setStep={setStep} letter={letter} />
        )}
        {step === LetterStep.FINAL && <FinalStep letter={letter} />}
      </AnimatePresence>
    </div>
  );
};

const FirstStep = ({ letter, setStep }: letterProps) => {
  return (
    <div className='flex flex-col items-center'>
      {' '}
      <h1 className='mb-4 text-lg font-bold'>You have a letter from {letter.sender}</h1>
      <Button onClick={() => setStep(LetterStep.FINAL)}>Open it now</Button>
    </div>
  );
};

const FinalStep = ({ letter }: { letter: letter }) => {
  const editor = useEditor({
    editable: false,
    content: JSON.parse(letter?.message),
    extensions: [StarterKit]
  });

  if (!editor) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='container flex flex-col px-10 py-10 mx-auto md:w-2/4 '
    >
      <h1 className='mb-12 text-3xl font-bold text-center font-charter'>
        {letter?.title}
      </h1>
      <div className='flex flex-col items-center'>
        <EditorContent editor={editor} />
      </div>
    </motion.div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { letterId } = query!;

  const letter = await db.letter.findUnique({
    where: { id: letterId as string }
  });

  if (!letter) {
    return {
      notFound: true
    };
  }

  return {
    props: { letter } // will be passed to the page component as props
  };
};

export default Letter;
