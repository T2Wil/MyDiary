import bcrypt from 'bcrypt';

const hashPassword = (pswd) => bcrypt.hashSync(pswd, bcrypt.genSaltSync(5));
export default hashPassword;
