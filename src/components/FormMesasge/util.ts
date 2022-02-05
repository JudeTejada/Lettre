import { letter } from '@/utils/types';

export const submitLetter = async (letterData: letter) => {
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

}