var app, request, should;

should = require("should");

request = require("supertest");

app = void 0;

describe("Resource special conditions", function() {
    describe("use function keyword", function() {
        before(function(done) {
            require('./support/resource-use-function-keyword');
            app = require('../')._app;
            return done();
        });
        return it("should work when $filter it", function(done) {
            return request(app).post('/odata/resource-use-function-keyword').send({
                year: 2015
            }).expect(201).expect('Content-Type', /json/).end(function(err, res) {
                if (err) {
                    return done(err);
                }
                return request(app).get('/odata/resource-use-function-keyword?$filter=year eq 2015').expect(200).expect('Content-Type', /json/).end(function(err, res) {
                    if (err) {
                        return done(err);
                    }
                    res.body.value.length.should.be.above(0);
                    return done();
                });
            });
        });
    });
    return describe("use custom id", function() {
        before(function(done) {
            require('./support/resource-use-custom-id');
            app = require('../')._app;
            return done();
        });
        return it("should work", function(done) {
            return request(app).post('/odata/resource-use-custom-id').send({
                id: 100
            }).expect(201).expect('Content-Type', /json/).end(function(err, res) {
                if (err) {
                    return done(err);
                }
                return request(app).get('/odata/resource-use-custom-id').expect(200).expect('Content-Type', /json/).end(function(err, res) {
                    if (err) {
                        return done(err);
                    }
                    res.body.value[0].id.should.be.equal(100);
                    return done();
                });
            });
        });
    });
});