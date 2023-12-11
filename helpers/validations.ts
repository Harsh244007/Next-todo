export const validateEmail = (email: string): boolean => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validatePassword = (password: string): boolean => {
  const passRegex = /^(?=.*[A-Z]).{8,}$/;
  return passRegex.test(password);
};
