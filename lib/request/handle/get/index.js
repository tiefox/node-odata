module.exports = {
    get: function(req, res, next, mongooseModel, cb) {
        return mongooseModel.findOne({
            _id: req.params.id
        }, function(err, entity) {
            if (err) {
                return next(err);
            }
            if (!entity) {
                return res.status(404, 'Not Found').send('Not Found').end();
            }
            res.jsonp(entity);
            if (cb) {
                return cb(entity);
            }
        });
    },
    getAll: function(req, res, next, mongooseModel, cb, options) {
        var query, resData;
        resData = {};
        require('./query-parser/$count')(resData, mongooseModel, req.query['$count'], req.query['$filter']);
        query = mongooseModel.find();
        require('./query-parser/$filter')(query, req.query['$filter']);
        require('./query-parser/$orderby')(query, req.query['$orderby'] || options.orderby);
        require('./query-parser/$skip')(query, req.query['$skip'], options.maxSkip);
        require('./query-parser/$top')(query, req.query['$top'], options.maxTop);
        require('./query-parser/$select')(query, req.query['$select']);
        return query.exec(function(err, data) {
            resData.value = data;
            res.jsonp(resData);
            if (cb) {
                return cb(resData);
            }
        });
    }
};