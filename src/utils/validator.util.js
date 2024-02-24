import { EMAIL_REGEX, PASSWORD_REGEX } from "../constant.js";

export const emailValidator = (email) => {
  return EMAIL_REGEX.test(email);
};

export const passwordValidator = (password) => {
  return PASSWORD_REGEX.test(password);
};
