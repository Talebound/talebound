import { HelperMessage, helperOK, HelperType } from './helperTypes';

export const validateEmailRegex = (value: string) => {
  return value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
};

export const validateEmail = (email: string): HelperMessage => {
  if (!email) return helperOK;

  const isValidRegex = validateEmailRegex(email);
  if (!isValidRegex) {
    return {
      text: 'Enter valid email',
      type: HelperType.Danger,
    };
  }

  const isValidLength = email.length >= 6 && email.length <= 200;
  if (!isValidLength) {
    return {
      text: 'Needs to be between 6 and 200 characters',
      type: HelperType.Danger,
    };
  }

  return helperOK;
};
