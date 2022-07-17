const validatePassword = (password) => {
  // REQUIRES: 6 characters, 1 uppercase, 1 lowercase, 1 number, space allowed, special characters allowed
  return password.match(/(?=.*[0-9]+)(?=.*[a-z]+)(?=.*[A-Z]+).{6,}$/);
};

export default validatePassword;