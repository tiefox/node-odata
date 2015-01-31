var convertToOperator;

module.exports = {
    indexof: function(query, key, odataOperator, value) {
        var operator, target, _ref, _ref1;
        _ref = key.substring(key.indexOf('(') + 1, key.indexOf(')')).split(','), key = _ref[0], target = _ref[1];
        _ref1 = [key.trim(), target.trim()], key = _ref1[0], target = _ref1[1];
        operator = convertToOperator(odataOperator);
        return query.$where("this." + key + ".indexOf(" + target + ") " + operator + " " + value);
    },
    year: function(query, key, odataOperator, value) {
        var condition, end, start;
        key = key.substring(key.indexOf('(') + 1, key.indexOf(')'));
        start = new Date(+value, 0, 1);
        end = new Date(+value + 1, 0, 1);
        switch (odataOperator) {
            case 'eq':
                return query.where(key).gte(start).lt(end);
            case 'ne':
                condition = [{}, {}];
                condition[0][key] = {
                    $lt: start
                };
                condition[1][key] = {
                    $gte: end
                };
                return query.or(condition);
            case 'gt':
                return query.where(key).gte(end);
            case 'ge':
                return query.where(key).gte(start);
            case 'lt':
                return query.where(key).lt(start);
            case 'le':
                return query.where(key).lt(end);
        }
    }
};

convertToOperator = function(odataOperator) {
    var operator;
    operator = void 0;
    switch (odataOperator) {
        case 'eq':
            operator = '==';
            break;
        case 'ne':
            operator = '!=';
            break;
        case 'gt':
            operator = '>';
            break;
        case 'ge':
            operator = '>=';
            break;
        case 'lt':
            operator = '<';
            break;
        case 'le':
            operator = '<=';
    }
    return operator;
};