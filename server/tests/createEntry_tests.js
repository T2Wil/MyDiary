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
let entry = fakeEntries[0];
const userCredentials = user.generateFakeUser();
let headerAuth = '';

describe('Test POST /api/v1/entries', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userCredentials)
      .end((err, res) => {
        headerAuth = res.body.data.token;
        done();
      });
  });
  it('should return 200 HTTP status code if an entry successfully created', (done) => {
    entry.headerAuth = headerAuth;
    chai.request(app)
      .post('/api/v1/entries/')
      .send(entry)
      .end((err, res) => {
        expect(res.body).to.have.property('status').equals(200).that.is.a('number');
        expect(res.body).to.have.property('data').that.is.an('object');
        expect(res.body).to.have.property('data').that.includes.property('id');
        expect(res.body).to.have.property('data').that.includes.property('title').that.is.a('string');
        expect(res.body).to.have.property('data').that.includes.property('description').that.is.a('string');
        expect(res.body).to.have.property('data').that.includes.property('createdOn');
        expect(res.body).to.have.property('data').that.includes.property('message').that.is.a('string');
        done();
      });
  });
  it('should return 400 HTTP status code if entry is empty', (done) => {
    entry = {
      title: '',
      description: '',
    };
    chai.request(app)
      .post('/api/v1/entries')
      .send(entry)
      .end((error, response) => {
        expect(response.body).to.have.property('status').equals(400).that.is.a('number');
        expect(response.body).to.have.property('error').equals('Bad request: Cant create an empty entry').that.is.a('string');
        done();
      });
  });
});
