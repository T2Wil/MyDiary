// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import chaiThings from 'chai-things';
// import fakeEntries from '../mock/fakeEntries';
// import app from '../app';
// import FakeUser from '../mock/FakeUser';

// process.env.NODE_ENV = 'test';


// chai.use(chaiHttp);
// chai.use(chaiThings);
// const { expect } = chai;
// const user = new FakeUser();
// let userData = user.generateFakeUser();

// describe('Test DELETE /api/v1/entries/:entryId', () => {
//   const fakeEntry = fakeEntries[0];
//   it('should return 200 HTTP status code if an entry successfully deleted', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/signup')
//       .send(userData)
//       .end((err, res) => {
//         fakeEntry.headerAuth = res.body.data.token;
//         chai.request(app)
//           .post('/api/v1/entries/')
//           .send(fakeEntry)
//           .end((error, response) => {
//             const delInfo = {};
//             delInfo.headerAuth = res.body.data.token;
//             delInfo.entryId = `${response.body.data.id}`;
//             const path = `/api/v1/entries/${delInfo.entryId}`;
//             chai.request(app)
//               .delete(path)
//               .send(delInfo)
//               .end((er, resp) => {
//                 expect(resp.body).to.have.property('status').equals(200).that.is.a('number');
//                 expect(resp.body).to.have.property('data').that.is.a('object');
//                 expect(resp.body).to.have.property('data').that.includes.property('message').equals('entry successfully deleted').that.is.a('string');
//               });
//           });
//       });
//     done();
//   });
//   it('should return 404 HTTP status code if entry doesn\'t exists', (done) => {
//     userData = user.generateFakeUser();
//     chai.request(app)
//       .post('/api/v1/auth/signup')
//       .send(userData)
//       .end((err, res) => {
//         fakeEntry.headerAuth = res.body.data.token;
//         chai.request(app)
//           .post('/api/v1/entries/')
//           .send(fakeEntry)
//           .end((error, response) => {
//             const delInfo = {};
//             delInfo.headerAuth = res.body.data.token;
//             delInfo.entryId = `${response.body.data.id}`;
//             const path = '/api/v1/entries/10000';
//             chai.request(app)
//               .delete(path)
//               .send(delInfo)
//               .end((er, resp) => {
//                 expect(resp.body).to.have.property('status').equals(404).that.is.a('number');
//                 expect(resp.body).to.have.property('error').equals('Entry doesn\'t exists').that.is.a('string');
//               });
//           });
//       });
//     done();
//   });
// });
