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
});

const signinSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }).required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
});

const entrySchema = Joi.object({
  title: Joi.string().min(3),
  description: Joi.string(),
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

export const validateNewEntry = (req, res, next) => {
  try {
    const { error } = entrySchema.validate(req.body);
    const titleLength = req.body.title.length;
    const bodyLength = req.body.description.length;
    if ((!titleLength) && (!bodyLength)) {
      res.status(400).json({
        status: res.statusCode,
        error: 'Bad request: Cant create an empty entry',
      });
    } else if (error) {
      res.status(400).json({
        status: res.statusCode,
        error: `Bad request: ${error.details[0].message}`,
      });
    } else next();
  } catch (err) {
    res.status(404).json({
      status: res.statusCode,
      error: 'Not Found',
    });
  }
};
