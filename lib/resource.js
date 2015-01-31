var checkAuth, config, id, metadata, mongoose, _;

_ = require('lodash');

mongoose = require('mongoose');

config = require('./config');

metadata = require('./metadata');

id = require('./mongodb/idPlugin');

module.exports = {
    register: function(params) {
        var action, actions, app, globalQueryLimit, model, mongooseModel, name, options, prefix, resource, rest, route, routes, schema, url, _fn, _results;
        app = config.get('app');
        prefix = config.get('prefix');
        globalQueryLimit = config.get('queryLimit');
        resource = params.url;
        if (params.url.indexOf('/') === 0) {
            resource = params.url.slice(1);
        }
        if (resource.indexOf('/') >= 0) {
            throw new Error("Resource of url can't contain '/', it can only be allowed to exist in the beginning.");
        }
        model = params.model;
        metadata.add(resource, model);
        schema = new mongoose.Schema(model, {
            _id: false,
            versionKey: false,
            collection: resource
        });
        schema.plugin(id);
        mongooseModel = mongoose.model(resource, schema);
        options = _.extend(globalQueryLimit, params.options) || {};
        rest = params.rest || {};
        actions = params.actions || [];
        routes = {
            'create': {
                method: 'post',
                url: "" + prefix + "/" + resource,
                controller: require('./request/handle/post'),
                config: rest.post || rest.create || {}
            },
            'update': {
                method: 'put',
                url: "" + prefix + "/" + resource + "/:id",
                controller: require('./request/handle/put'),
                config: rest.put || rest.update || {}
            },
            'del': {
                method: 'del',
                url: "" + prefix + "/" + resource + "/:id",
                controller: require('./request/handle/delete'),
                config: rest["delete"] || rest.del || {}
            },
            'read': {
                method: 'get',
                url: "" + prefix + "/" + resource + "/:id",
                controller: require('./request/handle/get').get,
                config: rest.get || rest.read || {}
            },
            'readAll': {
                method: 'get',
                url: "" + prefix + "/" + resource,
                controller: require('./request/handle/get').getAll,
                config: rest.getAll || rest.readAll || {}
            }
        };
        _fn = function(name, route) {
            return app[route.method](route.url, function(req, res, next) {
                if (checkAuth(route.config.auth, req, res)) {
                    route.config.before && route.config.before(req, res);
                    return route.controller(req, res, next, mongooseModel, route.config.after, options);
                }
            });
        };
        for (name in routes) {
            route = routes[name];
            _fn(name, route);
        }
        _results = [];
        for (url in actions) {
            action = actions[url];
            _results.push((function(url, action) {
                return app.post("" + prefix + "/" + resource + "/:id" + url, function(req, res, next) {
                    if (checkAuth(action.auth)) {
                        return action(req, res, next);
                    }
                });
            })(url, action));
        }
        return _results;
    }
};

checkAuth = function(auth, req, res) {
    if (auth && !auth(req)) {
        res.send(401);
        return false;
    }
    return true;
};