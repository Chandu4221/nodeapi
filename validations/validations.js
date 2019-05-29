const Joi = require("@hapi/joi");

const validateUserRegistration = userData => {
  const userRegistrationValidationSchema = {
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  };

  return Joi.validate(userData, userRegistrationValidationSchema);
};

const validateUserLogin = userData => {
  const userLoginValidationSchema = {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .required()
  };
  return Joi.validate(userData, userLoginValidationSchema);
};

module.exports.validateUserRegistration = validateUserRegistration;
module.exports.validateUserLogin = validateUserLogin;
