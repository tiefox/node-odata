var app, request, should;

should = require("should");

request = require("supertest");

require("../examples/hidden-field");

app = require('../')._app;

describe("hidden-field", function() {
    before(function(done) {
        return done();
    });
    it("should work when get entity", function(done) {
        return request(app).post("/odata/users").send({
            name: "zack",
            password: "123"
        }).expect(201).expect('Content-Type', /json/).end(function(err, res) {
            if (err) {
                return done(err);
            }
            return request(app).get("/odata/users/" + res.body.id).expect(200).end(function(err, res) {
                res.body.should.be.have.property('name');
                res.body.name.should.be.equal('zack');
                res.body.should.be.not.have.property('password');
                return done();
            });
        });
    });
    return it("should work when get entities list", function(done) {
        return request(app).get("/odata/users").expect(200).end(function(err, res) {
            res.body.value[0].should.be.have.property('name');
            res.body.value[0].name.should.be.equal('zack');
            res.body.value[0].should.be.not.have.property('password');
            return done();
        });
    });

    /*
    it "should work when get entities list even if it is selected", (done) ->
      request(app)
        .get("/odata/users?$select=name, password")
        .expect(200)
        .end (err, res) ->
          res.body.value[0].should.be.have.property('name')
          res.body.value[0].name.should.be.equal('zack')
          res.body.value[0].should.be.not.have.property('password')
          done()

    it "should work when get entities list even if only it is selected", (done) ->
      request(app)
        .get("/odata/users?$select=password")
        .expect(200)
        .end (err, res) ->
          res.body.value[0].should.be.not.have.property('name')
          res.body.value[0].should.be.not.have.property('password')
          done()
     */
});