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

describe('Test GET /api/v1/entries', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userCredentials)
      .end((err, res) => {
        headerAuth = res.body.data.token;
        entry.headerAuth = headerAuth;
        chai.request(app)
          .post('/api/v1/entries/')
          .send(entry)
          .end(() => {
            done();
          });
      });
  });
  it('should return 200 HTTP status code if entries successfully retrieved', (done) => {
    chai.request(app)
      .get('/api/v1/entries/')
      .send({ headerAuth })
      .end((err, res) => {
        // console.log(`body response: ${JSON.stringify(res.body.data[0])}`);
        // console.log(`body response: ${JSON.stringify(Object.keys(res.body.data[0]))}`);
        expect(res.body).to.have.property('status').equals(200).that.is.a('number');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('entries');
        expect(Object.keys(res.body.data[0])).to.have.members(['id', 'title', 'description', 'createdOn']);
        expect(res.body.data[0].title).to.be.a('string');
        expect(res.body.data[0].description).to.be.a('string');
        done();
      });
  });
  it('should return 401 HTTP status code if no token is provided', (done) => {
    chai.request(app)
      .get('/api/v1/entries/')
      .end((err, res) => {
        expect(res.body).to.have.property('status').equals(401).that.is.a('number');
        expect(res.body).to.have.property('error').equals('Unauthorized Access');
        done();
      });
  });
});
