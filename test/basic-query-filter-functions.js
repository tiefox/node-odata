var app, books, request, should, support;

should = require("should");

request = require("supertest");

require("../examples/basic");

support = require('./support');

app = void 0;

books = void 0;

describe("odata query filter functions", function() {
    before(function(done) {
        return support.ready(function() {
            app = support.app;
            books = support.books;
            return done();
        });
    });
    describe("'indexof'", function() {
        it("should filter items", function(done) {
            return request(app).get("/odata/books?$filter=indexof(title,'i') ge 1").expect(200).expect('Content-Type', /json/).end(function(err, res) {
                if (err) {
                    return done(err);
                }
                res.body.value.length.should.greaterThan(0);
                res.body.value.should.matchEach(function(item) {
                    return item.title.indexOf('i') >= 1;
                });
                return done();
            });
        });
        return it("should filter items when it has extra spaces in query string", function(done) {
            return request(app).get("/odata/books?$filter=indexof(title,'Visual Studio') ge 0").expect(200).expect('Content-Type', /json/).end(function(err, res) {
                if (err) {
                    return done(err);
                }
                res.body.value.length.should.greaterThan(0);
                res.body.value.should.matchEach(function(item) {
                    return item.title.indexOf('Visual Studio') >= 0;
                });
                return done();
            });
        });
    });
    return describe("'year'", function() {
        return it("should filter items", function(done) {
            return request(app).get("/odata/books?$filter=year(publish_date) eq 2000").expect(200).expect('Content-Type', /json/).end(function(err, res) {
                if (err) {
                    return done(err);
                }
                res.body.value.length.should.greaterThan(0);
                res.body.value.should.matchEach(function(item) {
                    return new Date(item.publish_date).getFullYear() === 2000;
                });
                return done();
            });
        });
    });
});