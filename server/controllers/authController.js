import User from '../models/User';
import generateToken from '../helpers/generateToken';
import Database from '../database/Database';

const user = new User();
const database = new Database();

export const signup = async (req, res) => {
  const {
    firstName, lastName, email, password,
  } = req.body;
  const registeredUsers = await database.retrieveAllUsers();
  if (registeredUsers) {
    user.users = registeredUsers;
    const userAlreadyExists = user.findUser(email);
    if (userAlreadyExists) {
      res.status(409).json({
        status: res.statusCode,
        error: 'Conflict: User Already exists',
      });
    } else {
      user.setUser(firstName, lastName, password, email);
      const newUser = user.getUser();
      const userAdded = await database.addNewUser(user);
      if (userAdded) {
        const { userId } = newUser;
        const newToken = generateToken({ userId });
        res.status(201).json({
          status: res.statusCode,
          message: 'User created successfully',
          data: {
            token: newToken,
            userDetails: {
              FirstName: user.fName,
              LastName: user.lName,
              Email: user.email,
            },
          },
        });
      }
    }
  } else if (!registeredUsers) {
    user.setUser(firstName, lastName, password, email);
    const newUser = user.getUser();
    const tableCreated = await database.createUsersTable();
    if (tableCreated) {
      const userAdded = await database.addNewUser(user);
      if (userAdded) {
        const { userId } = newUser;
        const newToken = generateToken({ userId });
        res.status(201).json({
          status: res.statusCode,
          message: 'User created successfully',
          data: {
            token: newToken,
            userDetails: {
              FirstName: user.fName,
              LastName: user.lName,
              Email: user.email,
            },
          },
        });
      }
    }
  }
};

export const signin = (req, res) => {
  const { email, password } = req.body;
  const userInfo = user.findUser(email, password);
  const userId = userInfo.id;
  const newToken = generateToken({ userId });
  if (userInfo) {
    res.status(200).json({
      status: res.statusCode,
      message: 'User logged in successfully',
      data: {
        token: newToken,
        userDetails: {
          FirstName: user.fName,
          LastName: user.lName,
          Email: user.email,
        },
      },
    });
  } else {
    res.status(401).json({
      status: res.statusCode,
      error: 'Invalid credentials',
    });
  }
};
export const { users } = user;
