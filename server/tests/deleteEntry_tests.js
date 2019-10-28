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

describe('Test DELETE /api/v1/entries/:entryId', () => {
  const data = fakeEntries[0];
  it('should return 200 HTTP status code if an entry successfully deleted', (done) => {
    chai.request(app)
      .post('/api/v1/entries/')
      .send(data)
      .end((err, res) => {
        const entryId = `${res.body.data.id}`;
        const path = `/api/v1/entries/${entryId}`;
        chai.request(app)
          .delete(path)
          .send(entryId)
          .end((er, resp) => {
            expect(resp.body).to.have.property('status').equals(200).that.is.a('number');
            expect(resp.body).to.have.property('data').that.is.a('object');
            expect(resp.body).to.have.property('data').that.includes.property('message').equals('entry successfully deleted').that.is.a('string');
          });
        done();
      });
  });
  it('should return 404 HTTP status code if entry doesn\'t exists', (done) => {
    const path = '/api/v1/entries/10000';
    chai.request(app)
      .delete(path)
      .send(data)
      .end((err, res) => {
        expect(res.body).to.have.property('status').equals(404).that.is.a('number');
        expect(res.body).to.have.property('error').equals('Entry doesn\'t exists').that.is.a('string');
      });
    done();
  });
});
