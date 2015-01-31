module.exports = function(query, $orderby) {
    var data, item, key, order, value, _i, _len, _ref;
    if (!$orderby) {
        return;
    }
    order = {};
    _ref = $orderby.split(',');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        data = item.trim().split(' ');
        if (data.length > 2) {
            throw new Error("odata: Syntax error at '" + $orderby + "', it's should be like 'ReleaseDate asc, Rating desc'");
        }
        key = data[0].trim();
        value = data[1] || 'asc';
        order[key] = value;
    }
    return query.sort(order);
};