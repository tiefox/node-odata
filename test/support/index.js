var callback, data, done, fixtures, mongoose, odata, uuid;

odata = require("../../");

mongoose = odata.mongoose;

uuid = require('node-uuid');

fixtures = require("pow-mongoose-fixtures");

callback = void 0;

done = void 0;

data = require("./data.json");

fixtures.load({
    books: data
}, mongoose.connection, function(err) {
    return mongoose.model('books').find().exec(function(err, data) {
        module.exports.app = odata._app;
        module.exports.books = data;
        done = true;
        if (callback) {
            return callback();
        }
    });
});

module.exports.ready = function(cb) {
    callback = cb;
    if (done) {
        return callback();
    }
};