import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import FakeUser from '../mock/FakeUser';
import app from '../app';

chai.use(chaiHttp);
chai.use(chaiThings);
const { expect } = chai;

const user = new FakeUser();
const data = user.generateFakeUser();


describe('Test POST /api/v1/auth/signup/', () => {
  it('should return 201 HTTP status code on success', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(data)
      .end((err, res) => {
        expect(res.body).to.have.property('status').equals(201).that.is.a('number');
        expect(res.body).to.have.property('message').equals('User created successfully').that.is.a('string');
        expect(res.body).to.have.property('data').that.includes.property('token').that.is.a('string');
      });
    done();
  });

  it('should return 409 HTTP status code if user already exists', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(data)
      .end(() => {
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send(data)
          .end((er, res) => {
            expect(res.body).to.have.property('status').equals(409).that.is.a('number');
            expect(res.body).to.have.property('error').equals('Conflict: User Already exists').that.is.a('string');
          });
      });
    done();
  });

  it('should return 400 HTTP status code if  client error', (done) => {
    data.junk = 'unwanted input';
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(data)
      .end((err, res) => {
        expect(res.body).to.have.property('status').equals(400).that.is.a('number');
        expect(res.body).to.have.property('error').that.is.a('string');
      });
    done();
  });
});
