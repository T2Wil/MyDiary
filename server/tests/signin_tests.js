// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import chaiThings from 'chai-things';
// import FakeUser from '../mock/FakeUser';
// import app from '../app';

// chai.use(chaiHttp);
// chai.use(chaiThings);
// const { expect } = chai;

// const user = new FakeUser();
// const data = user.generateFakeUser();

// describe('Test POST /api/v1/auth/signin/', () => {
//   it('should return 200 HTTP status code on success', (done) => {
//     const signinData = {
//       email: data.email,
//       password: data.password,
//     };
//     chai.request(app)
//       .post('/api/v1/auth/signup')
//       .send(data)
//       .end(() => {
//         chai.request(app)
//           .post('/api/v1/auth/signin')
//           .send(signinData)
//           .end((err, res) => {
//             expect(res.body).to.have.property('status').equals(200).that.is.a('number');
//             expect(res.body).to.have.property('data').that.includes.property('token').that.is.a('string');
//           });
//         done();
//       });
//   });
//   it('should return 400 HTTP status code if invalid credentials', (done) => {
//     const newUser = user.generateFakeUser();
//     const signinData = {
//       email: newUser.email,
//       password: newUser.password,
//     };
//     chai.request(app)
//       .post('/api/v1/auth/signin')
//       .send(signinData)
//       .end((err, res) => {
//         expect(res.body).to.have.property('status').equals(400).that.is.a('number');
//         expect(res.body).to.have.property('error').equals('Invalid credentials').that.is.a('string');
//       });
//     done();
//   });
// });
