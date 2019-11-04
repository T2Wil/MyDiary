import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
class Database {
  constructor() {
    this.createUsersTableReq = `CREATE TABLE IF NOT EXISTS 
      users(
        id UUID PRIMARY KEY,
        firstName VARCHAR(128) NOT NULL,
        lastName VARCHAR(128) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL
        )`;
    this.addUserReq = '';
    this.findUserReq = '';
  }

  async createUsersTable() {
    return pool.query(this.createUsersTableReq);
  }

  async addUser(newUser) {
    this.addUserReq = `INSERT INTO 
    users(id,firstname,lastname,email,password)
    values('${newUser.id}','${newUser.fName}','${newUser.lName}','${newUser.email}','${newUser.pswd}'
    )`;
    return pool.query(this.addUserReq);
  }
}
export default Database;
