const mailRegex = /[A-z]{1,64}@iddi\.edu\.co$/;

export const isEmpty = (...strings: string[]): boolean => {
  return strings.some((str) => str.trim() === '');
};

export const isValidAppEmail = (email: string) => {
  return mailRegex.test(email);
};
