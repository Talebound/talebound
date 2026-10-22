import { helperOK, HelperMessage, HelperType } from './helperTypes';

const usernameHelperOK: HelperMessage = {
  ...helperOK,
  text: '(3-32 characters, letters, numbers and underscores)',
};

export const validateUsernameRegex = (value: string) => {
  return value.match(/^[a-zA-Z0-9_]+$/);
};

export const validateUsername = (username: string): HelperMessage => {
  if (!username) return usernameHelperOK;

  const isValidRegex = validateUsernameRegex(username);
  if (!isValidRegex) {
    return {
      text: 'Enter valid username (3-32 characters, letters, numbers and underscores)',
      type: HelperType.Danger,
    };
  }

  const isValidLength = username.length >= 3 && username.length <= 32;
  if (!isValidLength) {
    return {
      text: 'Needs to be between 3 and 32 characters',
      type: HelperType.Danger,
    };
  }

  return usernameHelperOK;
};
