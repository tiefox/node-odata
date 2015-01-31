module.exports = function(req, res, next, mongooseModel, cb) {
    var entity;
    if (Object.keys(req.body).length === 0) {
        return res.status(422, 'Your request was understood, but contained invalid parameters').end();
    }
    entity = new mongooseModel(req.body);
    return entity.save(function(err) {
        if (err) {
            return next(err);
        }
        res.status(201).jsonp(entity);
        if (cb) {
            return cb(entity);
        }
    });
};