const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('With correct params', () => {
  it(' /ogscraper :: it should GET us all OG parameters & info!', (done) => {
    let reqData = { url : 'https://www.facebook.com/' };
    chai.request(app)
      .post('/ogscraper')
      .send(reqData)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object').and.have.any.keys('title', 'description', 'images');
        res.body.images.should.be.an('array').and.not.be.empty;
        //console.log({ req : reqData, res: res.body});
        done();
      });
  });
});

describe('With incorrect params', () => {

  it(' /ogscraper :: without URL!', (done) => {
    let reqData = { url : '' };
    chai.request(app)
      .post('/ogscraper')
      .send(reqData)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object').and.have.keys('error');
        res.body.error.should.be.a('string').to.eql('No URL Found!');
        //console.log({ req : reqData, res: res.body});
        done();
      });
  });

  it(' /ogscraper :: with incorrect URL!', (done) => {
    let reqData = { url : 'qwejqoiweuqioewu' };
    chai.request(app)
      .post('/ogscraper')
      .send(reqData)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object').and.have.keys('error');
        res.body.error.should.be.a('string').to.eql('Invalid URL!');
        //console.log({ req : reqData, res: res.body});
        done();
      });
  });

});
