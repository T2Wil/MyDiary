import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import fakeEntries from '../mock/fakeEntries';
import app from '../app';
import FakeUser from '../mock/FakeUser';

process.env.NODE_ENV = 'test';


chai.use(chaiHttp);
chai.use(chaiThings);

const { expect } = chai;
const user = new FakeUser();
const entry = fakeEntries[0];
const userCredentials = user.generateFakeUser();
let headerAuth = '';

describe('Test GET /api/v2/entries', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(userCredentials)
      .end((err, res) => {
        headerAuth = res.body.data.token;
        entry.headerAuth = headerAuth;
        chai.request(app)
          .post('/api/v2/entries/')
          .send(entry)
          .end(() => {
            done();
          });
      });
  });
  it('should return 500 HTTP status code if internal server errors', (done) => {
    chai.request(app)
      .get('/api/v2/entries/')
      .send({ headerAuth })
      .end((err, res) => {
        expect(res.body).to.have.property('status').equals(500).that.is.a('number');
        done();
      });
  });
  it('should return 401 HTTP status code if no token is provided', (done) => {
    chai.request(app)
      .get('/api/v2/entries/')
      .end((err, res) => {
        expect(res.body).to.have.property('status').equals(401).that.is.a('number');
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
