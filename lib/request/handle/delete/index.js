module.exports = function(req, res, next, mongooseModel, cb) {
    return mongooseModel.remove({
        _id: req.params.id
    }, function(err, count) {
        if (err) {
            return next(err);
        }
        if (count === 0) {
            return res.status(404, 'Not Found').send('Not Found').end();
        }
        res.send(200);
        if (cb) {
            return cb();
        }
    });
};