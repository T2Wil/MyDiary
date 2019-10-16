/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import fakeEntries from '../mock/fakeEntries';
import app from '../app';

process.env.NODE_ENV = 'test';


chai.use(chaiHttp);
chai.use(chaiThings);
const { expect } = chai;

describe('Test GET /api/v1/entries/', () => {
  const data = fakeEntries[0];
  it('should return 200 HTTP status code if entries successfully retrieved', (done) => {
    chai.request(app)
      .post('/api/v1/entries/')
      .send(data)
      .end(() => {
        chai.request(app)
          .get('/api/v1/entries/')
          .end((er, resp) => {
            expect(resp.body).to.have.property('status').equals(200).that.is.a('number');
            expect(resp.body).to.have.property('data').that.is.an('array');
            expect(resp.body.data[0]).to.have.property('id').that.is.a('number');
            expect(resp.body.data[0]).to.have.property('title').that.is.a('string');
            expect(resp.body.data[0]).to.have.property('description').that.is.a('string');
          });
        done();
      });
  });
});
