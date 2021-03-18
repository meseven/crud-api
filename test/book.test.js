const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

const server = require('../app');

let book_id;

describe('/books endpoint testleri', () => {
  it('[POST] bu endpoint yeni bir kitap eklemeli', (done) => {
    const book = {
      name: 'Tarih',
      year: 2020,
      description: 'lorem ipsum doler',
    };

    chai
      .request(server)
      .post('/books')
      .send(book)
      .end((err, res) => {
        res.should.have.status(200);

        // console.log('res.body:', res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('year');
        res.body.should.have.property('description');

        book_id = res.body._id;

        done();
      });
  });

  it('[GET] bu endpoint tüm kitapları getirmeli', (done) => {
    chai
      .request(server)
      .get('/books')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('array');
        done();
      });
  });

  it('[GET] /:id bu endpoint ilgili kitabı getirmeli', (done) => {
    chai
      .request(server)
      .get(`/books/${book_id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('year');
        res.body.should.have.property('description');
        done();
      });
  });

  it('[PUT] bu endpoint ilgili kitabı güncellemeli', (done) => {
    const data = {
      name: 'Deneme',
      description: 'Test',
    };

    chai
      .request(server)
      .put(`/books/${book_id}`)
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql(data.name);
        res.body.should.have.property('description').eql(data.description);
        done();
      });
  });

  it('[DELETE] /:id bu endpoint ilgili kitabı silmeli', (done) => {
    chai
      .request(server)
      .delete(`/books/${book_id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('year');
        res.body.should.have.property('description');
        done();
      });
  });
});
