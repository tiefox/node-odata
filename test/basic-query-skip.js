var app, books, request, should, support;

should = require("should");

request = require("supertest");

require("../examples/basic");

support = require('./support');

app = void 0;

books = void 0;

describe("odata query skip", function() {
    before(function(done) {
        return support.ready(function() {
            app = support.app;
            books = support.books;
            return done();
        });
    });
    it("should skip items", function(done) {
        return request(app).get("/odata/books").expect(200).expect('Content-Type', /json/).end(function(err, res) {
            var firstBook;
            firstBook = res.body.value[0];
            return request(app).get("/odata/books?$skip=1").expect(200).expect('Content-Type', /json/).end(function(err, res) {
                res.body.value[0].title.should.not.be.equal(firstBook.title);
                return done();
            });
        });
    });
    it("should not items when skip over count of items", function(done) {
        return request(app).get("/odata/books?$skip=1024").expect(200).expect('Content-Type', /json/).end(function(err, res) {
            res.body.value.length.should.be.equal(0);
            return done();
        });
    });
    it("should 500 when skip not a number", function(done) {
        return request(app).get("/odata/books?$skip=not-a-number").expect(500, done);
    });
    return it("should 500 when skip not a positive number", function(done) {
        return request(app).get("/odata/books?$skip=-1").expect(500, done);
    });
});