var app, books, request, should, support;

should = require("should");

request = require("supertest");

require("../examples/basic");

support = require('./support');

app = void 0;

books = void 0;

describe("odata action", function() {
    before(function(done) {
        return support.ready(function() {
            app = support.app;
            books = support.books;
            return done();
        });
    });
    return it("should work", function(done) {
        return request(app).post("/odata/books/" + books[10].id + "/50off").expect(200).expect('Content-Type', /json/).end(function(err, res) {
            if (err) {
                return done(err);
            }
            res.body.price.should.be.equal(+((books[10].price / 2).toFixed(2)));
            return done();
        });
    });
});