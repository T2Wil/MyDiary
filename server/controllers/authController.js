import User from '../models/User';
import { generateToken } from '../middleware/token';

const user = new User();

export const signup = (req, res) => {
  const {
    firstName, lastName, email, password,
  } = req.body;
  const newToken = generateToken({ email });
  const userExists = user.findUser(email);
  if (userExists) {
    res.status(409).json({
      status: res.statusCode,
      error: 'Conflict: User Already exists',
    });
  } else {
    user.setUser(firstName, lastName, password, email);
    res.status(201).json({
      status: res.statusCode,
      message: 'User created successfully',
      data: {
        token: newToken,
      },
    });
  }
};
export const signin = (req, res) => {
  const { email, password } = req.body;
  const newToken = generateToken({ email });

  const userExists = user.findUser(email, password);
  if (userExists) {
    res.status(200).json({
      status: res.statusCode,
      data: {
        token: newToken,
      },
    });
  } else {
    res.status(400).json({
      status: res.statusCode,
      error: 'Invalid credentials',
    });
  }
};