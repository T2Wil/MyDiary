import bcrypt from 'bcrypt';

const comparePassword = ((hashedPswd, pswd) => bcrypt.compareSync(pswd, hashedPswd));

export default comparePassword;
