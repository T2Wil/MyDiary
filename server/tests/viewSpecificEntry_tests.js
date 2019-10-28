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

describe('Test GET /api/v1/entries/:entryId', () => {
  const data = fakeEntries[0];
  it('should return 200 HTTP status code if an entry successfully retrieved', (done) => {
    chai.request(app)
      .post('/api/v1/entries/')
      .send(data)
      .end((err, res) => {
        const entryId = `${res.body.data.id}`;
        const path = `/api/v1/entries/${entryId}`;
        chai.request(app)
          .get(path)
          .end((er, resp) => {
            expect(resp.body).to.have.property('status').equals(200).that.is.a('number');
            expect(resp.body).to.have.property('data').that.is.a('object');
            expect(resp.body).to.have.property('data').that.includes.property('id').that.is.a('number');
            expect(resp.body).to.have.property('data').that.includes.property('title').that.is.a('string');
            expect(resp.body).to.have.property('data').that.includes.property('description').that.is.a('string');
            expect(resp.body).to.have.property('data').that.includes.property('createdOn');
          });
        done();
      });
  });
  it('should return 404 HTTP status code if an entry doesn\'t exists', (done) => {
    const path = '/api/v1/entries/10000';
    chai.request(app)
      .get(path)
      .end((err, res) => {
        expect(res.body).to.have.property('status').equals(404).that.is.a('number');
        expect(res.body).to.have.property('error').equals('Entry doesn\'t exists').that.is.a('string');
      });
    done();
  });
});
