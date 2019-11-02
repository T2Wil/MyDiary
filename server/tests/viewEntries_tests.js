import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import fakeEntries from '../mock/FakeEntries';
import FakeUser from '../mock/FakeUser';
import app from '../app';

process.env.NODE_ENV = 'test';


chai.use(chaiHttp);
chai.use(chaiThings);
const { expect } = chai;
const user = new FakeUser();

const userData = user.generateFakeUser();


describe('Test GET /api/v1/entries/', () => {
  const fakeEntry = fakeEntries[0];
  it('should return 200 HTTP status code if entries successfully retrieved', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userData)
      .end((err, res) => {
        fakeEntry.headerAuth = res.body.data.token;
        chai.request(app)
          .post('/api/v1/entries/')
          .send(fakeEntry)
          .end(() => {
            const headerAuth = res.body.data.token;
            chai.request(app)
              .get('/api/v1/entries/')
              .send(headerAuth)
              .end((er, resp) => {
                expect(resp.body).to.have.property('status').equals(200).that.is.a('number');
                expect(resp.body).to.have.property('data').that.is.an('array');
                expect(resp.body.data[0]).to.have.property('id').that.is.a('number');
                expect(resp.body.data[0]).to.have.property('title').that.is.a('string');
                expect(resp.body.data[0]).to.have.property('description').that.is.a('string');
              });
          });
      });
    done();
  });
});
