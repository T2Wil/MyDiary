/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';

const signupSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30)
    .required(),
  lastName: Joi.string().alphanum().min(3).max(30)
    .required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }).required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
  repeatPassword: Joi.ref('password'),
});

const signinSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }).required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
});
export const validateSignupParams = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: res.statusCode,
      error: error.details[0].message,
    });
  } else next();
};
export const validateSigninParams = (req, res, next) => {
  const { error } = signinSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: res.statusCode,
      error: `Bad request: ${error.details[0].message}`,
    });
  } else next();
};
