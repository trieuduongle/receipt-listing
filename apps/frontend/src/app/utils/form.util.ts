import { FieldError } from 'react-hook-form';
export const getErrorMessage = (error?: FieldError | FieldError[]): string => {
  if (!error) {
    return '';
  }

  const message =
    (Array.isArray(error) ? error[0].message : error.message) || '';

  return message;
};
