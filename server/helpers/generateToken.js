import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();
const generateToken = (payload) => jwt.sign(payload, process.env.SECRET_KEY,
  {
    expiresIn: '1h',
  });

export default generateToken;
