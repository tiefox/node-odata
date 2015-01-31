module.exports = function(resData, mongooseModel, $count, $filter) {
    var query;
    if (!$count) {
        return;
    }
    if ($count === 'true') {
        query = mongooseModel.find();
        require('./$filter')(query, $filter);
        return query.count(function(err, count) {
            return resData['@odata.count'] = count;
        });
    } else if ($count === 'false') {

    } else {
        throw new Error('Unknown $count  option, only "true" and "false" are supported.');
    }
};