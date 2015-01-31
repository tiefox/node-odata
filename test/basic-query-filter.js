var app, books, request, should, support;

should = require("should");

request = require("supertest");

require("../examples/basic");

support = require('./support');

app = void 0;

books = void 0;

describe("odata query filter", function() {
    before(function(done) {
        return support.ready(function() {
            app = support.app;
            books = support.books;
            return done();
        });
    });
    describe("'Equal'", function() {
        it("should filter items", function(done) {
            return request(app).get("/odata/books?$filter=title eq '" + books[1].title + "'").expect(200).expect('Content-Type', /json/).end(function(err, res) {
                if (err) {
                    return done(err);
                }
                res.body.value.length.should.be.equal(1);
                res.body.value[0].title.should.be.equal(books[1].title);
                return done();
            });
        });
        it("should filter items when it has extra spaces at begin", function(done) {
            return request(app).get("/odata/books?$filter=   title eq '" + books[1].title + "'").expect(200).expect('Content-Type', /json/).end(function(err, res) {
                if (err) {
                    return done(err);
                }
                res.body.value.length.should.be.equal(1);
                res.body.value[0].title.should.be.equal(books[1].title);
                return done();
            });
        });
        it("should filter items when it has extra spaces at mid", function(done) {
            return request(app).get("/odata/books?$filter=title   eq   '" + books[1].title + "'").expect(200).expect('Content-Type', /json/).end(function(err, res) {
                if (err) {
                    return done(err);
                }
                res.body.value.length.should.be.equal(1);
                res.body.value[0].title.should.be.equal(books[1].title);
                return done();
            });
        });
        return it("should filter items when it has extra spaces at end", function(done) {
            return request(app).get("/odata/books?$filter=title eq '" + books[1].title + "'   ").expect(200).expect('Content-Type', /json/).end(function(err, res) {
                if (err) {
                    return done(err);
                }
                res.body.value.length.should.be.equal(1);
                res.body.value[0].title.should.be.equal(books[1].title);
                return done();
            });
        });
    });
    describe("'Not equal'", function() {
        return it("should filter items", function(done) {
            return request(app).get("/odata/books?$filter=title ne '" + books[1].title + "'").expect(200).expect('Content-Type', /json/).end(function(err, res) {
                if (err) {
                    return done(err);
                }
                res.body.value.should.matchEach(function(item) {
                    return item.title !== books[1].title;
                });
                return done();
            });
        });
    });
    describe("'Greater than'", function() {
        return it("should filter items", function(done) {
            return request(app).get("/odata/books?$filter=price gt 36.95").expect(200).expect('Content-Type', /json/).end(function(err, res) {
                if (err) {
                    return done(err);
                }
                res.body.value.length.should.greaterThan(0);
                res.body.value.should.matchEach(function(item) {
                    return item.price > 36.95;
                });
                return done();
            });
        });
    });
    describe("'Greater than or equal'", function() {
        return it("should filter items", function(done) {
            return request(app).get("/odata/books?$filter=price ge 36.95").expect(200).expect('Content-Type', /json/).end(function(err, res) {
                if (err) {
                    return done(err);
                }
                res.body.value.length.should.greaterThan(0);
                res.body.value.should.matchEach(function(item) {
                    return item.price >= 36.95;
                });
                return done();
            });
        });
    });
    describe("'Less than'", function() {
        return it("should filter items", function(done) {
            return request(app).get("/odata/books?$filter=price lt 36.95").expect(200).expect('Content-Type', /json/).end(function(err, res) {
                if (err) {
                    return done(err);
                }
                res.body.value.length.should.greaterThan(0);
                res.body.value.should.matchEach(function(item) {
                    return item.price < 36.95;
                });
                return done();
            });
        });
    });
    describe("'Less than or equal'", function() {
        return it("should filter items", function(done) {
            return request(app).get("/odata/books?$filter=price le 36.95").expect(200).expect('Content-Type', /json/).end(function(err, res) {
                if (err) {
                    return done(err);
                }
                res.body.value.length.should.greaterThan(0);
                res.body.value.should.matchEach(function(item) {
                    return item.price <= 36.95;
                });
                return done();
            });
        });
    });
    return describe("'Logical and'", function() {
        it("should filter items", function(done) {
            return request(app).get("/odata/books?$filter=title ne '" + books[1].title + "' and price ge 36.95").expect(200).expect('Content-Type', /json/).end(function(err, res) {
                if (err) {
                    return done(err);
                }
                res.body.value.length.should.greaterThan(0);
                res.body.value.should.matchEach(function(item) {
                    return item.title !== books[1].title && item.price >= 36.95;
                });
                return done();
            });
        });
        return it("should filter items when it has extra spaces", function(done) {
            return request(app).get("/odata/books?$filter=title ne '" + books[1].title + "'   and   price ge 36.95").expect(200).expect('Content-Type', /json/).end(function(err, res) {
                if (err) {
                    return done(err);
                }
                res.body.value.length.should.greaterThan(0);
                res.body.value.should.matchEach(function(item) {
                    return item.title !== books[1].title && item.price >= 36.95;
                });
                return done();
            });
        });
    });
});