import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { db } from '@/utils/primsa';

import { letter, LetterStep } from '@/utils/types';
import { Button, Seo } from '../components';
import { GetServerSideProps } from 'next';

interface stepProps {
  letter: letter;
  setStep: (step: LetterStep) => void;
}

const Letter = ({ letter }: { letter: letter }) => {
  const [step, setStep] = useState<LetterStep>(LetterStep.FIRST);

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

const FirstStep = ({ letter, setStep }: stepProps) => {
  return (
    <div className='flex flex-col items-center'>
      {' '}
      <h1 className='mb-4 text-lg font-bold'>
        You have a letter from {letter.sender}
      </h1>
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
    <>
      <Seo title={letter.title} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='container flex flex-col w-full px-10 py-10 mx-auto '
      >
        <h1 className='mb-12 text-3xl font-bold text-center font-charter'>
          {letter?.title}
        </h1>
          <EditorContent editor={editor} />
      </motion.div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params!;

  const letter = await db.letter.findUnique({
    where: { id: id as string }
  });

  if (!letter) {
    return {
      notFound: true
    };
  }

  return {
    props: { letter }
  };
};

export default Letter;
