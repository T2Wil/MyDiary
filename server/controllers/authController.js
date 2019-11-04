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
    // const createUsersTableReq = `CREATE TABLE IF NOT EXISTS 
    // users(
    //   id UUID PRIMARY KEY,
    //   firstName VARCHAR(128) NOT NULL,
    //   lastName VARCHAR(128) NOT NULL,
    //   email VARCHAR(128) UNIQUE NOT NULL,
    //   password VARCHAR(128) NOT NULL
    //   )`;
    // const usersTableCreated = await pool.query(createUsersTableReq);
    const usersTableCreated = await database.createUsersTable();
    // console.log(`usersTableCreated: ${JSON.stringify(usersTableCreated)}`);
    if (usersTableCreated) {
      user.setUser(firstName, lastName, password, email);
      const newUser = user.getUser();

      // const addUserReq = `INSERT INTO 
      // users(id,firstname,lastname,email,password)
      // values('${newUser.id}','${newUser.fName}','${newUser.lName}','${newUser.email}','${newUser.pswd}'
      // )`;
      // const { rows } = await pool.query(addUserReq);
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
