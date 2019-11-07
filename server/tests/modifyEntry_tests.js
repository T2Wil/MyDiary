import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import app from '../app';

process.env.NODE_ENV = 'test';


chai.use(chaiHttp);
chai.use(chaiThings);

const { expect } = chai;
let entryId;

describe('Test PATCH /api/v2/entries/:entryId', () => {
  it('should return 401 HTTP status code if no token provided', (done) => {
    const path = `/api/v2/entries/${entryId}`;
    const updatedEntry = {
      title: 'Updated title',
      description: 'Updated entry description',
    };

    chai.request(app)
      .patch(path)
      .send({ updatedEntry })
      .end((err, resp) => {
        expect(resp.body).to.have.property('status').equals(401).that.is.a('number');
        expect(resp.body).to.have.property('error');
        done();
      });
  });
  it('should return 401 HTTP status code if invalid token is provided', (done) => {
    const path = `/api/v2/entries/${entryId}`;
    const header = 'eNzI3MjYxODQsImV4nR5cCI6IkpXVCJMC1mZGFlI1NiIsInODY5ZS01NzI1OGVhYWRkYjQiLCJpYXQiOjE1NzI3MjYxODQsImV4cCI6MTU3MjcyOT';
    chai.request(app)
      .get(path)
      .send({ header })
      .end((err, resp) => {
        expect(resp.body).to.have.property('status').equals(401).that.is.a('number');
        expect(resp.body).to.have.property('error');
        done();
      });
  });
});
