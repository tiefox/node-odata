var app, books, request, should, support;

should = require("should");

request = require("supertest");

require("../examples/basic");

support = require('./support');

app = void 0;

books = void 0;

describe("odata query count", function() {
    before(function(done) {
        return support.ready(function() {
            app = support.app;
            books = support.books;
            return done();
        });
    });
    it("should get count", function(done) {
        return request(app).get("/odata/books?$count=true").expect(200).expect('Content-Type', /json/).end(function(err, res) {
            if (err) {
                return done(err);
            }
            res.body.should.be.have.property('@odata.count');
            res.body.should.be.have.property('value');
            res.body['@odata.count'].should.be.equal(res.body.value.length);
            return done();
        });
    });
    it("should not get count", function(done) {
        return request(app).get("/odata/books?$count=false").expect(200).expect('Content-Type', /json/).end(function(err, res) {
            if (err) {
                return done(err);
            }
            res.body.should.be.not.have.property('@odata.count');
            return done();
        });
    });
    return it("should 500 when $count isn't 'true' or 'false'", function(done) {
        return request(app).get("/odata/books?$count=1").expect(500, done);
    });
});