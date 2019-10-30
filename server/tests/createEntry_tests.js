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

describe('Test POST /api/v1/entries', () => {
  let data = fakeEntries[0];
  it('should return 200 HTTP status code if an entry successfully created', (done) => {
    chai.request(app)
      .post('/api/v1/entries/')
      .send(data)
      .end((err, res) => {
        expect(res.body).to.have.property('status').equals(200).that.is.a('number');
        expect(res.body).to.have.property('data').that.is.an('object');
        expect(res.body).to.have.property('data').that.includes.property('id').that.is.a('number');
        expect(res.body).to.have.property('data').that.includes.property('title').that.is.a('string');
        expect(res.body).to.have.property('data').that.includes.property('description').that.is.a('string');
        expect(res.body).to.have.property('data').that.includes.property('createdOn');
        expect(res.body).to.have.property('data').that.includes.property('message').that.is.a('string');
      });
    done();
  });
  it('should return 400 HTTP status code if entry is empty', (done) => {
    data = {
      title: '',
      description: '',
    };
    chai.request(app)
      .post('/api/v1/entries/')
      .send(data)
      .end((err, res) => {
        expect(res.body).to.have.property('status').equals(400).that.is.a('number');
        expect(res.body).to.have.property('error').equals('Bad request: Cant create an empty entry').that.is.a('string');
      });
    done();
  });
  it('should return 404 HTTP status code if invalid parameters are passed in', (done) => {
    data = {};
    chai.request(app)
      .post('/api/v1/entries/')
      .send(data)
      .end((err, res) => {
        expect(res.body).to.have.property('status').equals(404).that.is.a('number');
        expect(res.body).to.have.property('error').equals('Not Found').that.is.a('string');
      });
    done();
  });
});
