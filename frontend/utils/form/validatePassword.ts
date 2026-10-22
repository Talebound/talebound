import { HelperMessage, helperOK, HelperType } from './helperTypes';

const passwordHelperOK: HelperMessage = {
  ...helperOK,
  text: '(6 - 100 characters)',
};

const getBaseHelper = (text: string): HelperMessage => ({
  text,
  type: undefined,
});

const passwordAgainHelperOK: HelperMessage = helperOK;

export const validateString = (
  value: string,
  min: number,
  max: number,
  defaultText?: string,
): HelperMessage => {
  const baseText = defaultText ?? `(${min} - ${max} characters)`;

  if (!value && min === 0) return getBaseHelper(baseText);

  const isValidLength = value.length >= min && value.length <= max;

  if (!isValidLength) {
    return {
      text: `(${min}-${max} characters)`,
      type: HelperType.Danger,
    };
  }

  return getBaseHelper(baseText);
};

export const validatePassword = (password: string): HelperMessage => {
  if (!password) return passwordHelperOK;

  const isValidLength = password.length >= 6 && password.length <= 100;
  if (!isValidLength) {
    return {
      text: 'Needs to be between 6 and 100 characters',
      type: HelperType.Danger,
    };
  }

  return passwordHelperOK;
};

export const validatePasswordAgain = (password1: string, password2: string): HelperMessage => {
  if (!password1) return passwordAgainHelperOK;
  if (!password2) return passwordAgainHelperOK;

  if (password1 !== password2) {
    return {
      text: "Passwords don't match",
      type: HelperType.Danger,
    };
  }

  return passwordAgainHelperOK;
};
