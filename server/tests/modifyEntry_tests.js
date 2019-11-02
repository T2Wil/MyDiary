import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import fakeEntries from '../mock/FakeEntries';
import app from '../app';
import FakeUser from '../mock/FakeUser';

process.env.NODE_ENV = 'test';


chai.use(chaiHttp);
chai.use(chaiThings);
const { expect } = chai;
const user = new FakeUser();
const userData = user.generateFakeUser();

describe('Test PATCH /api/v1/entries/:entryId', () => {
  const fakeEntry = fakeEntries[0];
  it('should return 200 HTTP status code if an entry successfully modified', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userData)
      .end((err, response) => {
        fakeEntry.headerAuth = response.body.data.token;
        chai.request(app)
          .post('/api/v1/entries/')
          .send(fakeEntry)
          .end((error, res) => {
            const entryChanges = {};
            entryChanges.title = 'modified new entry title';
            entryChanges.description = 'modified entry description';
            entryChanges.entryId = res.body.data.id;
            entryChanges.headerAuth = response.body.data.token;
            const path = `/api/v1/entries/${entryChanges.entryId}`;
            chai.request(app)
              .patch(path)
              .send(entryChanges)
              .end((er, resp) => {
                expect(resp.body).to.have.property('status').equals(200).that.is.a('number');
                expect(resp.body).to.have.property('data').that.is.a('object');
                expect(resp.body).to.have.property('data').that.includes.property('id');
                expect(resp.body).to.have.property('data').that.includes.property('title').that.is.a('string');
                expect(resp.body).to.have.property('data').that.includes.property('description').that.is.a('string');
              });
          });
      });
    done();
  });
});
