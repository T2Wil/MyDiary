import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import { before } from 'mocha';
import FakeUser from '../mock/FakeUser';
import app from '../app';

chai.use(chaiHttp);
chai.use(chaiThings);
const { expect } = chai;

const user = new FakeUser();
const userCredentials = user.generateFakeUser();

describe('Test POST /api/v2/auth/signin/', () => {
  let signinData = {};
  before((done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(userCredentials)
      .end(() => {
        signinData = {
          email: userCredentials.email,
          password: userCredentials.password,
        };
        done();
      });
  });

  it('should return 200 HTTP status code on success', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(signinData)
      .end((err, res) => {
        expect(res.body).to.have.property('status').equals(200).that.is.a('number');
        expect(res.body).to.have.property('data').that.includes.property('token').that.is.a('string');
        done();
      });
  });
  it('should return 401 HTTP status code if invalid credentials', (done) => {
    const newUser = user.generateFakeUser();
    signinData = {
      email: newUser.email,
      password: newUser.password,
    };
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(signinData)
      .end((err, res) => {
        expect(res.body).to.have.property('status').equals(401).that.is.a('number');
        expect(res.body).to.have.property('error').equals('Invalid credentials').that.is.a('string');
        done();
      });
  });
  it('should return 422 HTTP status code if invalid inputs', (done) => {
    const newUser = user.generateFakeUser();
    signinData = {
      password: newUser.password,
    };
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(signinData)
      .end((err, res) => {
        expect(res.body).to.have.property('status').equals(422).that.is.a('number');
        expect(res.body).to.have.property('error').equals('invalid input').that.is.a('string');
        done();
      });
  });
});
