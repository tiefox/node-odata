var app, books, request, should, support;

should = require("should");

request = require("supertest");

require("../examples/basic");

support = require('./support');

app = void 0;

books = void 0;

describe("odata query select", function() {
    before(function(done) {
        return support.ready(function() {
            app = support.app;
            books = support.books;
            return done();
        });
    });
    it("should select anyone field", function(done) {
        return request(app).get("/odata/books?$select=price").expect(200).expect('Content-Type', /json/).end(function(err, res) {
            if (err) {
                return done(err);
            }
            res.body.value[0].should.be.have.property('price');
            res.body.value[0].should.be.not.have.property('title');
            res.body.value[0].should.be.not.have.property('id');
            return done();
        });
    });
    it("should select multiple field", function(done) {
        return request(app).get("/odata/books?$select=price,title").expect(200).expect('Content-Type', /json/).end(function(err, res) {
            if (err) {
                return done(err);
            }
            res.body.value[0].should.be.have.property('price');
            res.body.value[0].should.be.have.property('title');
            res.body.value[0].should.be.not.have.property('id');
            return done();
        });
    });
    it("should select multiple field with blank space", function(done) {
        return request(app).get("/odata/books?$select=price,   title").expect(200).expect('Content-Type', /json/).end(function(err, res) {
            if (err) {
                return done(err);
            }
            res.body.value[0].should.be.have.property('price');
            res.body.value[0].should.be.have.property('title');
            res.body.value[0].should.be.not.have.property('id');
            return done();
        });
    });
    return it("should select id field", function(done) {
        return request(app).get("/odata/books?$select=price,title,id").expect(200).expect('Content-Type', /json/).end(function(err, res) {
            if (err) {
                return done(err);
            }
            res.body.value[0].should.be.have.property('price');
            res.body.value[0].should.be.have.property('title');
            res.body.value[0].should.be.have.property('id');
            return done();
        });
    });
});


/*
  it "should 500 when select not exist field", (done) ->
    request(app)
      .get("/odata/books?$select=not-exist-field")
      .expect(500, done)
 */