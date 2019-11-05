import generateId from 'uuid/v1';
import hashPassword from '../helpers/hashPassword';

class User {
  constructor() {
    this.fName = '';
    this.lName = '';
    this.email = '';
    this.pswd = '';
    this.id = 0;
  }

  setUser(fName, lName, pswd, email) {
    this.fName = fName;
    this.lName = lName;
    this.email = email;
    this.pswd = hashPassword(pswd);
    this.id = generateId();
  }

  getUser() {
    return {
      id: this.id,
      fName: this.fName,
      lName: this.lName,
      email: this.email,
      pswd: this.pswd,
    };
  }
}
export default User;
