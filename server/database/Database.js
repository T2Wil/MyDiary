import { Pool } from 'pg';
import dotenv from 'dotenv';


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
      password VARCHAR(128) UNIQUE NOT NULL
      )`;
    this.usersReq = 'SELECT * FROM users';
    this.addUserReq = ' ';
  }

  async createUsersTable() {
    const conn = await pool.connect();
    const results = await conn.query(this.createUsersTableReq);
    if (results) return true;
    return false;
  }

  async addNewUser(user) {
    this.addUserReq = `INSERT INTO 
    users(id,firstname,lastname,email,password)
    values('${user.id}','${user.fName}','${user.lName}','${user.email}','${user.pswd}'
    )`;
    const conn = await pool.connect();
    const results = await conn.query(this.addUserReq);
    if (results) return true;
    return false;
  }

  async retrieveAllUsers() {
    const conn = await pool.connect();
    const usersTableExists = await this.createUsersTable();
    if (usersTableExists) {
      const results = await conn.query(this.usersReq);
      return results.rows;
    } return false;
  }
}
export default Database;
