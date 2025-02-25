export const removesNonNumericCharacters = (string: string): string => {
  return string.replace(/[^\d]/g, '');
};
