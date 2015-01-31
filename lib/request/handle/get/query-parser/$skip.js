var _;

_ = require("lodash");

module.exports = function(query, skip, maxSkip) {
    if (!(skip || maxSkip)) {
        return;
    }
    skip = +skip;
    if (skip !== skip) {
        throw new Error("Incorrect format for $skip argument, '" + skip + "' must be a numeric type.");
    }
    if (skip < 0) {
        throw new Error("Incorrect format for $skip argument, '" + skip + "' must be great than 0.");
    }
    if (_.isNumber(maxSkip)) {
        skip = _.min([skip, maxSkip]);
    }
    return query.skip(skip);
};