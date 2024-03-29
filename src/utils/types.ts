export interface letter {
  message: string;
  receiver: string;
  sender: string;
  title: string;
}

export enum Form {
  Initial = 'Initial',
  Loading = 'Loading',
  Error = 'Error'
}

export enum LetterStep {
  FIRST = 'First',
  FINAL = 'Final'
}

export type FormState = {
  state: Form;
  message?: string;
};

export type letterData = {
  letterId: string;
};

export type ButtonType = 'primary' | 'secondary';
