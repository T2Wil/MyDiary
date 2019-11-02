import jwt from 'jsonwebtoken';

const generateToken = (payload) => jwt.sign(payload, process.env.SECRET_KEY,
  {
    expiresIn: '1h',
  });

export default generateToken;
