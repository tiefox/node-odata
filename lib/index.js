var app, config, express;

express = require('express');
config = require('./config');

module.exports.resources = require('./resource');
module.exports.functions = require('./function');

module.exports.get = config.get;
module.exports.set = config.set;

module.exports.mongoose = require('mongoose');

app = express();
app.use(express.bodyParser());
app.use(express.query());
app.use(express.methodOverride());
app.use(function(req, res, next) {
    res.removeHeader("X-Powered-By");
    return next();
});

config.set('app', app);

module.exports._app = app;
module.exports._express = express;

module.exports.listen = function() {
    return app.listen.apply(app, arguments);
};

module.exports.use = function() {
    return app.use.apply(app, arguments);
};