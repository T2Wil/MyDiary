import User from '../models/User';
import generateToken from '../helpers/generateToken';
import Database from '../database/Database';
import compareToHashed from '../helpers/compareToHashed';


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
    if (err.routine === '_bt_check_unique') {
      res.status(409).json({
        status: res.statusCode,
        error: 'Conflict: User Already exists',
      });
    } else {
      res.status(500).json({
        status: res.statusCode,
        error: err.message,
      });
    }
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const matchedEmailContent = await database.findUser({ email, password });
    const emailFound = matchedEmailContent.rows.length;
    if (emailFound) {
      const hashedPassword = matchedEmailContent.rows[0].password;
      const pswdMatches = compareToHashed(hashedPassword, password);
      if (pswdMatches) {
        const { firstname, lastname, id } = matchedEmailContent.rows[0];
        const newToken = generateToken({ id });
        res.status(200).json({
          status: res.statusCode,
          message: 'User logged in successfully',
          data: {
            token: newToken,
            userDetails: {
              FirstName: firstname,
              LastName: lastname,
              Email: email,
            },
          },
        });
      }
    }
    res.status(401).json({
      status: res.statusCode,
      error: 'Invalid credentials',
    });
  } catch (err) {
    res.status(500).json({
      status: res.statusCode,
      error: err.message,
    });
  }
};
