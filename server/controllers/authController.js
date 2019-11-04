import User from '../models/User';
import generateToken from '../helpers/generateToken';
import Database from '../database/Database';

const user = new User();
const database = new Database();

export const signup = async (req, res) => {
  try {
    const {
      firstName, lastName, email, password,
    } = req.body;
    const usersTableCreated = await database.createUsersTable();
    if (usersTableCreated) {
      user.setUser(firstName, lastName, password, email);
      const newUser = user.getUser();
      await database.addUser(newUser);
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
  } catch (err) {
    res.status(409).json({
      status: res.statusCode,
      error: 'Conflict: User Already exists',
    });
  }
};

export const signin = (req, res) => {

};
