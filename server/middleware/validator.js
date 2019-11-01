import { signupSchema, signinSchema, entrySchema } from '../helpers/ValidationSchema';

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
    } else if (titleLength || bodyLength) next();
    else if (error) {
      res.status(400).json({
        status: res.statusCode,
        error: `Bad request: ${error.details[0].message}`,
      });
    } else next();
  } catch (err) {
    res.status(400).json({
      status: res.statusCode,
      error: 'Bad request',
    });
  }
};
