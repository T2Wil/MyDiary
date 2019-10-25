import { generateId } from '../helpers/utils';

class User {
  constructor() {
    this.fName = '';
    this.lName = '';
    this.email = '';
    this.pswd = '';
    this.id = 0;
    this.users = [];
  }

  setUser(fName, lName, pswd, email) {
    this.fName = fName;
    this.lName = lName;
    this.email = email;
    this.pswd = pswd;
    this.id = generateId();
    this.users.push(this.getUser());
  }

  findUser(email, pswd = 'not given') {
    let userData;
    if (pswd === 'not given') {
      userData = this.users.find((user) => (user.email === email));
    } else if (pswd !== 'not given') {
      userData = this.users.find((user) => (user.email === email && user.pswd === pswd));
    }
    if (userData) {
      this.fName = userData.fName;
      this.lName = userData.lName;
      this.email = userData.email;
      this.pswd = userData.pswd;
      this.id = userData.id;
      return true;
    }
    return false;
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

  deleteUser(id = this.id) {
    const userOfInterest = this.users.find((user) => user.id === id);
    const userLocation = this.users.indexOf(userOfInterest);
    this.users.splice(userLocation, 1);
  }

  updateUsers(id = this.id) {
    const userOfInterest = this.users.find((user) => user.id === id);
    const userLocation = this.users.indexOf(userOfInterest);
    this.users[userLocation] = this.getUser();
  }

  editUser({
    fName, lName, email, pswd,
  }) {
    if (fName) { this.fName = fName; }
    if (lName) { this.lName = lName; }
    if (email) { this.email = email; }
    if (pswd) { this.pswd = pswd; }
    this.updateUsers();
  }
}
export default User;
