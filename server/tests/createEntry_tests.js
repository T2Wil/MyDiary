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
let userData = user.generateFakeUser();

describe('Test POST /api/v1/entries', () => {
  let data = fakeEntries[0];
  it('should return 200 HTTP status code if an entry successfully created', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userData)
      .end((err, res) => {
        data.headerAuth = res.body.data.token;
        chai.request(app)
          .post('/api/v1/entries')
          .send(data)
          .end((error, response) => {
            expect(response.body).to.have.property('status').equals(200).that.is.a('number');
            expect(response.body).to.have.property('data').that.is.an('object');
            expect(response.body).to.have.property('data').that.includes.property('id');
            expect(response.body).to.have.property('data').that.includes.property('title').that.is.a('string');
            expect(response.body).to.have.property('data').that.includes.property('description').that.is.a('string');
            expect(response.body).to.have.property('data').that.includes.property('createdOn');
            expect(response.body).to.have.property('data').that.includes.property('message').that.is.a('string');
          });
      });
    done();
  });
  it('should return 400 HTTP status code if entry is empty', (done) => {
    data = {
      title: '',
      description: '',
    };
    userData = user.generateFakeUser();
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userData)
      .end((err, res) => {
        data.headerAuth = res.body.data.token;
        chai.request(app)
          .post('/api/v1/entries')
          .send(data)
          .end((error, response) => {
            expect(response.body).to.have.property('status').equals(400).that.is.a('number');
            expect(response.body).to.have.property('error').equals('Bad request: Cant create an empty entry').that.is.a('string');
          });
      });
    done();
  });

  it('should return 404 HTTP status code if invalid parameters are passed in', (done) => {
    const emptyData = {};
    userData = user.generateFakeUser();
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userData)
      .end((err, res) => {
        emptyData.headerAuth = res.body.data.token;
        chai.request(app)
          .post('/api/v1/entries')
          .send(emptyData)
          .end((error, response) => {
            expect(response.body).to.have.property('status').equals(400).that.is.a('number');
            expect(response.body).to.have.property('error').equals('Bad request').that.is.a('string');
          });
      });
    done();
  });
});
