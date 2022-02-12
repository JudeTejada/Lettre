import { letter } from '@/utils/types';
import toast from 'react-hot-toast';
import { mutate } from 'swr';

export const submitLetter = async (
  letterData: letter
): Promise<{ letterId: string }> => {
  const letter = await fetch(
    `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/letter/create`,
    {
      body: JSON.stringify(letterData),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }
  ).then(res => res.json());

  mutate('/api/letter/create', letter);
  return letter;
};

export const handleValidation = (letterData: letter, formStep: number) => {
  switch (formStep) {
    case 1: {
      if (!letterData.message) {
        toast.error("It's not a letter if there's no message  ");

        return false;
      }
      if (!letterData.title) {
        toast.error('Have you forgotten your title? ');

        return false;
      }

      return true;
    }

    case 2: {
      if (!letterData.receiver && !letterData.sender) {
        toast.error('Please fill  in all the input fields ');
        return false;
      }
      return true;
    }

    default:
      break;
  }
};
