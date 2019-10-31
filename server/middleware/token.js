import jwt from 'jsonwebtoken';
import { generateId } from '../helpers/utils';

const SECRET_KEY = 'secret_key';


export const generateToken = (payload) => jwt.sign(payload, SECRET_KEY,
  {
    expiresIn: '1h',
  });

export const verifyToken = (req, res, next) => {
  let token;
  if (process.env.NODE_ENV === 'test') {
    token = generateToken({ generateId });
  } else {
    const headerAuth = req.headers.authorization || req.headers.Authorization;
    const headerAuthArray = headerAuth.split(' ');
    [, token] = headerAuthArray;
  }

  jwt.verify(token, SECRET_KEY, (err,
    decoded) => {
    if (err) {
      res.status(401).json({
        status: 'error',
        error: 'Unauthorized Access',
      });
    } else {
      req.decoded = decoded;
      next();
    }
  });
};
