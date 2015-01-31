var app, books, request, should, support;

should = require("should");

request = require("supertest");

require("../examples/basic");

support = require('./support');

app = void 0;

books = void 0;

describe("odata query top", function() {
    before(function(done) {
        return support.ready(function() {
            app = support.app;
            books = support.books;
            return done();
        });
    });
    it("should top items", function(done) {
        return request(app).get("/odata/books?$top=1").expect(200).expect('Content-Type', /json/).end(function(err, res) {
            res.body.value.length.should.be.equal(1);
            return done();
        });
    });
    it("should 500 when top not a number", function(done) {
        return request(app).get("/odata/books?$top=not-a-number").expect(500, done);
    });
    return it("should 500 when top not a positive number", function(done) {
        return request(app).get("/odata/books?$top=-1").expect(500, done);
    });
});