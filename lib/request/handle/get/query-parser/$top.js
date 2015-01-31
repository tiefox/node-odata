var _;

_ = require("lodash");

module.exports = function(query, top, maxTop) {
    if (!(top || maxTop)) {
        return;
    }
    top = +top;
    if (top !== top) {
        throw new Error("Incorrect format for $top argument, '" + top + "' must be a numeric type.");
    }
    if (top < 0) {
        throw new Error("Incorrect format for $top argument, '" + top + "' must be great than 0.");
    }
    if (_.isNumber(maxTop)) {
        top = _.min([top, maxTop]);
    }
    return query.limit(top);
};