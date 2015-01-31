var add, build, config, entitiesDetail, entitiesList, parser;

config = require('./../config');

parser = require('./parser');

entitiesList = [];

entitiesDetail = {};

add = function(resource, entity) {
    entitiesList.push(resource);
    entitiesDetail[resource] = parser.toMetadata(entity);
    return build();
};

build = function(entity) {
    var app, prefix, _results;
    app = config.get('app');
    prefix = config.get('prefix');
    app.get(prefix || '/', function(req, res, next) {
        return res.json({
            resources: entitiesList
        });
    });
    app.get("" + prefix + "/__metadata", function(req, res, next) {
        return res.json(entitiesDetail);
    });
    _results = [];
    for (entity in entitiesDetail) {
        _results.push(app.get("" + prefix + "/__metadata/" + entity, function(req, res, next) {
            var data;
            data = {};
            data[entity] = entitiesDetail[entity];
            return res.json(data);
        }));
    }
    return _results;
};

module.exports = {
    add: add
};