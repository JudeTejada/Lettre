import { atom } from 'recoil';
import { letter } from '@/utils/types';

export const letterState = atom({
  key: 'letterState',
  default: {
    message: '',
    title: '',
    sender: '',
    receiver: ''
  } as letter
});
