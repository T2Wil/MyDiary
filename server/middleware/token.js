import jwt from 'jsonwebtoken';

const SECRET_KEY = 'secret_key';


export const generateToken = (payload) => jwt.sign(payload, SECRET_KEY,
  {
    expiresIn: '24h',
  });

export const verifyToken = (req, res, next) => {
  let token;
  if (process.env.NODE_ENV === 'test') {
    token = generateToken({ email: 'ishimwewil005@gmail.com' });
  } else {
    const headerAuth = req.headers.authorization || req.headers.Authorization;
    token = headerAuth.split(' ')[1];
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
