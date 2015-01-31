var app, books, request, should, support;

should = require("should");

request = require("supertest");

require("../examples/basic");

support = require('./support');

app = void 0;

books = void 0;

describe("basic CRUD", function() {
    before(function(done) {
        return support.ready(function() {
            app = support.app;
            books = support.books;
            return done();
        });
    });
    describe("GET:", function() {
        it("should get all of the resources", function(done) {
            return request(app).get("/odata/books").expect(200).expect('Content-Type', /json/).end(function(err, res) {
                if (err) {
                    return done(err);
                }
                res.body.should.be.have.property('value');
                res.body.value.length.should.be.equal(books.length);
                return done();
            });
        });
        return it("should get one of the resources", function(done) {
            return request(app).get("/odata/books('" + books[1].id + "')").expect(200).expect('Content-Type', /json/).end(function(err, res) {
                if (err) {
                    return done(err);
                }
                res.body.should.be.have.property('title');
                res.body.title.should.be.equal(books[1].title);
                return done();
            });
        });
    });
    describe("POST:", function() {
        it("should create new resource", function(done) {
            return request(app).post("/odata/books").send({
                author: "Walter Isaacson",
                description: "FROM THE AUTHOR OF THE BESTSELLING BIOGRAPHIES OF BENJAMIN FRANKLIN AND ALBERT EINSTEIN, THIS IS THE EXCLUSIVE BIOGRAPHY OF STEVE JOBS.",
                genre: "Computer",
                price: 19.65,
                publish_date: "2013-09-10",
                title: "Steve Jobs"
            }).expect(201).expect('Content-Type', /json/).end(function(err, res) {
                if (err) {
                    return done(err);
                }
                res.body.should.be.have.property('id');
                res.body.should.be.have.property('title');
                res.body.title.should.be.equal("Steve Jobs");
                return done();
            });
        });
        return it("should not create new resource if post nothing", function(done) {
            return request(app).post("/odata/books").expect(422, done);
        });
    });
    describe("PUT:", function() {
        it("should modify resource if it exist", function(done) {
            books[2].title = "I'm a new title";
            return request(app).put("/odata/books('" + books[2].id + "')").send(books[2]).expect(200).expect('Content-Type', /json/).end(function(err, res) {
                if (err) {
                    return done(err);
                }
                res.body.should.be.have.property('title');
                res.body.title.should.be.equal(books[2].title);
                return done();
            });
        });
        it("should not modify resource if it not exist", function(done) {
            return request(app).put("/odata/books('000000000000000000000000')").send(books[3]).expect(404, done);
        });
        it("should not modify resource if not use id", function(done) {
            return request(app).put("/odata/books").send(books[4]).expect(404, done);
        });
        return it("should not modify resource if id is a wrong format", function(done) {
            return request(app).put("/odata/books('put-wrong-id')").send(books[5]).expect(404, done);
        });
    });
    return describe("DELETE:", function() {
        it("should delete resource if it exist", function(done) {
            return request(app).del("/odata/books('" + books[6].id + "')").expect(200, done);
        });
        it("should not delete resource if it not exist", function(done) {
            return request(app).del("/odata/books('000000000000000000000001')").expect(404, done);
        });
        it("should not delete resource if not use id", function(done) {
            return request(app).del("/odata/books").expect(404, done);
        });
        it("should not delete resource if id is a wrong format", function(done) {
            return request(app).del("/odata/books('del-wrong-id')").expect(404, done);
        });
        return it("should not delete a resource twice", function(done) {
            return request(app).del("/odata/books('" + books[7].id + "')").end(function(err, res) {
                return request(app).del("/odata/books('" + books[7].id + "')").expect(404, done);
            });
        });
    });
});