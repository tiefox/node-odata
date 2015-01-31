var _;

_ = require("lodash");

module.exports = function(req, res, next, mongooseModel, cb) {
    return mongooseModel.findOne({
        _id: req.params.id
    }, function(err, entity) {
        var oldEntity;
        if (err) {
            return next(err);
        }
        if (!entity) {
            return res.status(404, 'Not Found').send('Not Found').end();
        }
        oldEntity = JSON.parse(JSON.stringify(entity));
        entity = _.extend(entity, req.body);
        return entity.save(function(err) {
            if (err) {
                next(err);
            }
            res.jsonp(entity);
            if (cb) {
                return cb(entity, oldEntity);
            }
        });
    });
};