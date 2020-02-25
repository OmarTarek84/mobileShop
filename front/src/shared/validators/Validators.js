const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';
const VALIDATOR_TYPE_ISNUMBER = 'ISNUMBER';
const VALIDATOR_TYPE_MATCHPASSWORDS = 'MATCHPASSWORDS';

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = val => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val
});
export const VALIDATOR_MAXLENGTH = val => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });
export const VALIDATOR_ISNUMBER = () => ({
  type: VALIDATOR_TYPE_ISNUMBER,
});

export const VALIDATOR_MATCHPASSWORDS = (val) => ({
  type: VALIDATOR_TYPE_MATCHPASSWORDS,
  val: val
});

export const validate = (value, validators) => {

  let errorMessages = [
    {text: 'This Field Is Required', appear: false},
    {text: 'This Field Is not number', appear: false},
    {text: 'This Field Must Have Maximum 150 characters', appear: false},
    {text: 'Email Is Not Valid', appear: false},
    {text: 'Passwords do not match', appear: false},
    {text: 'Password should have at least 8 characters', appear: false}
  ];

  let isValid = true;

  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
      errorMessages[0].appear = value.trim().length <= 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
      errorMessages[5].appear = value.trim().length < validator.val && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
      errorMessages[2].appear = value.trim().length > validator.val
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
      errorMessages[3].appear = !(/^\S+@\S+\.\S+$/.test(value)) && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_ISNUMBER) {
      isValid = isValid &&  /^[+-]?\d+(\.\d+)?$/.test(value);
      errorMessages[1].appear = !(/^[+-]?\d+(\.\d+)?$/.test(value)) && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MATCHPASSWORDS) {
      isValid = isValid &&  value === validator.val
      errorMessages[4].appear = value !== validator.val && value.trim().length > 0;
    }
  }
  return {
    isValid: isValid,
    errorMessages: errorMessages
  };
};
