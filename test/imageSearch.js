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
var urlRegex  = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

chai.use(chaiHttp);

describe('test', () => {
  it('testing', (done) => {
    chai.request('http://localhost:9080')
      .get('/api/google/imagesearch/cats')
      .end((err, res)=>{
        expect(res).to.have.status(200);
        var body = res.text;
        expect(body).to.be.an('array');
        if(body.length > 0) {
          expect(body[0].url).to.match(urlRegex);
          expect(body[0].snippet).to.be.a('string');
          expect(body[0].thumbnail).to.match(urlRegex);
          expect(body[0].context).to.match(urlRegex);
        }
        done();
      });
  });
});