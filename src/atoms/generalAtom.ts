import { atom } from 'recoil';

export const generalState = atom({
  key: 'generalState',
  default: {
    wordCount: 0
  }
});
