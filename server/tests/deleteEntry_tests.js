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
let entryId;

describe('Test DELETE /api/v1/entries/:entryId', () => {
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
          .end((er, resp) => {
            entryId = resp.body.data.id;
            done();
          });
      });
  });
  it('should return 200 HTTP status code if entries successfully retrieved', (done) => {
    const path = `/api/v1/entries/${entryId}`;
    chai.request(app)
      .delete(path)
      .send({ headerAuth })
      .end((err, resp) => {
        expect(resp.body).to.have.property('status').equals(200).that.is.a('number');
        expect(resp.body).to.have.property('data').that.is.a('object');
        expect(resp.body).to.have.property('data').that.includes.property('message').equals('entry successfully deleted');
        done();
      });
  });
});
