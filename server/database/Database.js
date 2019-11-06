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
    this.createEntriesTableReq = `CREATE TABLE IF NOT EXISTS 
      entries(
        entryId UUID PRIMARY KEY,
        userId UUID NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        createdDate TIMESTAMP
        )`;
    this.addEntryReq = '';
    this.viewEntriesReq = '';
    this.viewSpecificEntryReq = '';
    this.updateEntryReq = '';
    this.deleteEtnryReq = '';
  }

  async createUsersTable() {
    return pool.query(this.createUsersTableReq);
  }

  async createEntriesTable() {
    return pool.query(this.createEntriesTableReq);
  }

  async addUser(newUser) {
    this.addUserReq = `INSERT INTO 
    users(id,firstname,lastname,email,password)
    VALUES('${newUser.id}','${newUser.fName}','${newUser.lName}','${newUser.email}','${newUser.pswd}'
    )`;
    return pool.query(this.addUserReq);
  }

  async findUser({ email }) {
    this.findUserReq = `SELECT * FROM 
      users where email = '${email}'`;
    return pool.query(this.findUserReq);
  }

  async addEntry(userId, entry) {
    this.addEntryReq = `INSERT INTO
    entries(userId,entryId,title,description,createdDate)
    VALUES('${userId}','${entry.id}','${entry.title}','${entry.description}','${entry.createdOn}')`;
    return pool.query(this.addEntryReq);
  }

  async viewEntries(userId) {
    this.viewEntriesReq = `SELECT * FROM entries WHERE userid='${userId}'`;
    return pool.query(this.viewEntriesReq);
  }

  async viewSpecificEntry(userId, entryId) {
    this.viewSpecificEntryReq = `SELECT * FROM entries 
    WHERE userid='${userId}' 
    AND entryid='${entryId}'`;
    return pool.query(this.viewSpecificEntryReq);
  }

  async updateEntry(entryId, updates) {
    this.updateEntryReq = `UPDATE entries 
    SET title='${updates.title}',description='${updates.description}'
    WHERE entryid='${entryId}' RETURNING *`;

    return pool.query(this.updateEntryReq);
  }

  async deleteEntry(entryId) {
    this.deleteEntryReq = `DELETE FROM entries
    WHERE entryid='${entryId}' RETURNING *`;

    return pool.query(this.deleteEntryReq);
  }
}
export default Database;
