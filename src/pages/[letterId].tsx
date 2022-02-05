import { useEditor, JSONContent, Editor, EditorContent } from '@tiptap/react';
import { GetServerSideProps } from 'next';
import useSWR from 'swr';
import StarterKit from '@tiptap/starter-kit';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { db } from '@/utils/primsa';
import { letter } from '@/utils/types';

const fetcher = (...args) => fetch(...args).then(res => res.json());

interface dataProp {
  letter: letter;
}

const Letter = ({ letter }: dataProp) => {
  const router = useRouter();

  const { letterId } = router.query;

  // console.log(letterId, 'letterId');

  const editor = useEditor({
    editable: false,
    content: JSON.parse(letter?.message),
    extensions: [StarterKit]
  });

  if (!letter) return <h1>Loading....</h1>;

  if (!editor) return null;

  return (
    <div className='min-h-screen bg-primary-bg'>
      <div className='container flex flex-col px-10 py-10 mx-auto md:px-40 '>
        <h1 className='mb-6 text-3xl font-bold text-center font-charter'>
          {letterId}
        </h1>
      <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // Fetch data from external API
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
