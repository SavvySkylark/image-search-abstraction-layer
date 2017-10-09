//Require the dev-dependencies
// const supertest = require('supertest');
// const chai = require('chai');
// var expect = chai.expect;

// var server = supertest.agent('http://localhost:9080');

// describe('Search', () => {
//   console.log('thing2');
//   it('GET /api/google/imagesearch/:search', () => {
//     server.get('/api/google/imagesearch/cats')
//       .expect(200)
//       .end((err, res) => {
//         console.log(JSON.stringify(res.body));
//         done();
//       });
//     console.log('thing3');
//   });
// });

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);

describe('test', () => {
  it('testing', (done) => {
    chai.request('http://localhost:9080')
      .get('/api/google/imagesearch/cats')
      .end((err, res)=>{
        console.log('thing');
        expect(res).to.have.status(200);
        done();
      });
  });
});