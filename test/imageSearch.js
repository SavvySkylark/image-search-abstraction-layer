//Require the dev-dependencies
let chai = require('chai');
let expect = chai.expect;
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);

describe('Search', () => {
    
  describe('GET /api/google/imagesearch/:search', () => {
    chai.request(server)
      .get('/api/google/imagesearch/cats')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});
