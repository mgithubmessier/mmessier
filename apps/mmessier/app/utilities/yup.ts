import { string } from 'yup';
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const phoneNumberValidator = string()
  .matches(phoneRegExp, 'Phone number is not valid')
  .min(10, 'Phone number must have at least 10 digits');
