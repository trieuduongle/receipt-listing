export const isNullOrUndefined = (value: unknown) =>
  typeof value === 'undefined' || value === null;
export const isExist = (value: unknown) => !isNullOrUndefined(value);
