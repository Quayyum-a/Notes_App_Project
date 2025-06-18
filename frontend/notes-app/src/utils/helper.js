const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const validatePassword = (password) => {
  return password.length >= 8;
}

export { validateEmail, validatePassword }; 