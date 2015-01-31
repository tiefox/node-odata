var app, books, request, should, support;

should = require("should");

request = require("supertest");

require("../examples/basic");

support = require('./support');

app = void 0;

books = void 0;

describe("odata query orderby", function() {
    before(function(done) {
        return support.ready(function() {
            app = support.app;
            books = support.books;
            return done();
        });
    });
    it("should default let items order with asc", function(done) {
        return request(app).get("/odata/books?$orderby=price").expect(200).expect('Content-Type', /json/).end(function(err, res) {
            var i, item, nextItem, _i, _len, _ref;
            if (err) {
                return done(err);
            }
            res.body.should.be.have.property('value');
            _ref = res.body.value;
            for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
                item = _ref[i];
                nextItem = res.body.value[i + 1];
                if (nextItem) {
                    (item.price <= nextItem.price).should.be["true"];
                }
            }
            return done();
        });
    });
    it("should let items order asc", function(done) {
        return request(app).get("/odata/books?$orderby=price asc").expect(200).expect('Content-Type', /json/).end(function(err, res) {
            var i, item, nextItem, _i, _len, _ref;
            if (err) {
                return done(err);
            }
            res.body.should.be.have.property('value');
            _ref = res.body.value;
            for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
                item = _ref[i];
                nextItem = res.body.value[i + 1];
                if (nextItem) {
                    (item.price <= nextItem.price).should.be["true"];
                }
            }
            return done();
        });
    });
    it("should let items order desc", function(done) {
        return request(app).get("/odata/books?$orderby=price desc").expect(200).expect('Content-Type', /json/).end(function(err, res) {
            var i, item, nextItem, _i, _len, _ref;
            if (err) {
                return done(err);
            }
            res.body.should.be.have.property('value');
            _ref = res.body.value;
            for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
                item = _ref[i];
                nextItem = res.body.value[i + 1];
                if (nextItem) {
                    (item.price >= nextItem.price).should.be["true"];
                }
            }
            return done();
        });
    });
    return it("should let items order when use multiple fields", function(done) {
        return request(app).get("/odata/books?$orderby=price,title").expect(200).expect('Content-Type', /json/).end(function(err, res) {
            var i, item, nextItem, _i, _len, _ref;
            if (err) {
                return done(err);
            }
            res.body.should.be.have.property('value');
            _ref = res.body.value;
            for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
                item = _ref[i];
                nextItem = res.body.value[i + 1];
                if (nextItem) {
                    (item.price <= nextItem.price).should.be["true"];
                    if (item.price === nextItem.price) {
                        (item.title <= nextItem.title).should.be["true"];
                    }
                }
            }
            return done();
        });
    });
});


/*
  it "should 500 when order by not exist field", (done) ->
    request(app)
      .get("/odata/books?$orderby=not-exist-field")
      .expect(500, done)
 */