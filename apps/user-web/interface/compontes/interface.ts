import { Dispatch, SetStateAction } from 'react';

export interface ModalInterface {
  isLoginOpen?: boolean;
  setIsLoginOpen?: Dispatch<SetStateAction<boolean>>;
  isSignUpOpen?: boolean;
  setIsSignUpOpen?: Dispatch<SetStateAction<boolean>>;
}
