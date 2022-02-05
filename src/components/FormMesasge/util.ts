import { letter } from '@/utils/types';
import toast from 'react-hot-toast';

export const submitLetter = async (
  letterData: letter
): Promise<{ letterId: string }> => {
  const letter = await fetch(
    `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/create`,
    {
      body: JSON.stringify(letterData),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }
  ).then(res => res.json());

  return letter;
};

export const handleValidation = (letterData: letter, formStep: number) => {
  switch (formStep) {
    case 1: {
      if (!letterData.message) {
        toast('Please write something first');

        return false;
      }

      return true;
    }

    case 2: {
      if (!letterData.receiver && !letterData.sender) {
        toast('Please fill  in all the input fields ❌');
        return false;
      }
      return true;
    }

    default:
      break;
  }
};
