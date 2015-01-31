var config;

config = require('./config');

module.exports = {
    register: function(params) {
        var app, handle, method, prefix, url;
        url = params.url;
        method = params.method;
        handle = params.handle;
        app = config.get('app');
        prefix = config.get('prefix');
        return app[method.toLowerCase()]("" + prefix + url, handle);
    }
};