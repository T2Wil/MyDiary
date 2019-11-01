import Joi from '@hapi/joi';

export const signupSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30)
    .required(),
  lastName: Joi.string().alphanum().min(3).max(30)
    .required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }).required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
});

export const signinSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }).required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
});

export const entrySchema = Joi.object({
  title: Joi.string().min(3),
  description: Joi.string(),
});
