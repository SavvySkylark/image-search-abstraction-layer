var port = process.env.PORT;
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var urlRegex  = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

chai.use(chaiHttp);

describe('Search', () => {
  it('has no offset', (done) => {
    chai.request('http://localhost:' + port)
      .get('/api/imagesearch/cats')
      .end((err, res)=>{
        expect(res).to.have.status(200);
        expect(res.header['content-type']).to.eql('application/json');
        var body = JSON.parse(res.text);
        expect(body).to.be.an('array');
        if(body.length > 0) {
          expect(body[0].url).to.match(urlRegex);
          expect(body[0].snippet).to.be.a('string');
          expect(body[0].thumbnail).to.match(urlRegex);
          expect(body[0].context).to.match(urlRegex);
        }
        expect(body.length).to.eql(5);
        done();
      });
  });
  it('has latest searches', (done) => {
    chai.request('http://localhost:' + port)
      .get('/api/imagesearch/dog')
      .end();
    chai.request('http://localhost:' + port)
      .get('/api/imagesearch/dog')
      .end();
    chai.request('http://localhost:' + port)
      .get('/api/imagesearch/dog')
      .end();
    chai.request('http://localhost:' + port)
      .get('/api/imagesearch/dog')
      .end();
    chai.request('http://localhost:' + port)
      .get('/api/imagesearch/dog')
      .end();
    chai.request('http://localhost:' + port)
      .get('/api/imagesearch/dog')
      .end();
    chai.request('http://localhost:' + port)
      .get('/api/imagesearch/dog')
      .end();
    chai.request('http://localhost:' + port)
      .get('/api/imagesearch/dog')
      .end();
    chai.request('http://localhost:' + port)
      .get('/api/imagesearch/dog')
      .end();
    chai.request('http://localhost:' + port)
      .get('/api/imagesearch/catsa')
      .end();
    chai.request('http://localhost:' + port)
      .get('/api/imagesearch/catsb')
      .end(); 
    chai.request('http://localhost:' + port)
      .get('/api/imagesearch/catsc')
      .end();
    chai.request('http://localhost:' + port)
      .get('/api/latest/imagesearch')
      .end((err, res)=>{
        expect(res).to.have.status(200);
        expect(res.header['content-type']).to.eql('application/json');
        var body = JSON.parse(res.text);
        expect(body).to.be.an('array');
        expect(body[0].term).to.be.eql('catsc');
        expect(body[1].term).to.be.eql('catsb');
        expect(body[2].term).to.be.eql('catsa');
        expect(body.length).to.be.lessThan(11);
        done();
      });
  });
});