import jwt from 'jsonwebtoken';
import { users } from '../controllers/authController';

const verifyToken = (req, res, next) => {
  let token;
  if (process.env.NODE_ENV === 'test') {
    token = req.body.headerAuth;
  } else {
    const headerAuth = req.headers.authorization || req.headers.Authorization;
    if (!headerAuth) {
      res.status(401).json({
        status: 401,
        error: 'no token provided!',
      });
      return;
    }
    const headerAuthArray = headerAuth.split(' ');
    [, token] = headerAuthArray;
  }

  jwt.verify(token, process.env.SECRET_KEY, (err,
    decoded) => {
    if (err) {
      res.status(401).send({
        status: res.statusCode,
        error: 'Unauthorized Access',
      });
    } else {
      const isFound = users.find((user) => (user.id === decoded.userId));
      if (isFound) {
        req.body.userId = decoded.userId;
        next();
      } else {
        res.status(401).send({
          status: 'error',
          error: 'Unauthorized Access',
        });
      }
    }
  });
};
export default verifyToken;
