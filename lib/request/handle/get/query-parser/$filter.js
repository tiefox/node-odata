// Generated by CoffeeScript 1.8.0

/*
Operator  Description             Example
Comparison Operators
eq        Equal                   Address/City eq 'Redmond'
ne        Not equal               Address/City ne 'London'
gt        Greater than            Price gt 20
ge        Greater than or equal   Price ge 10
lt        Less than               Price lt 20
le        Less than or equal      Price le 100
has       Has flags               Style has Sales.Color'Yellow'    #todo
Logical Operators
and       Logical and             Price le 200 and Price gt 3.5
or        Logical or              Price le 3.5 or Price gt 200     #todo
not       Logical negation        not endswith(Description,'milk') #todo

eg.
  http://host/service/Products?$filter=Price lt 10.00
  http://host/service/Categories?$filter=Products/$count lt 10
 */

var functions, stringHelper, validator, _;

_ = require("lodash");

functions = require("../query-functions/index");

module.exports = function(query, $filter) {
    var SPLIT_KEY_OPERATOR_AND_VALUE, SPLIT_MULTIPLE_CONDITIONS, condition, conditionArr, item, key, oDataFunction, odataOperator, value, _i, _j, _len, _len1, _ref;
    if (!$filter) {
        return;
    }
    SPLIT_MULTIPLE_CONDITIONS = /(.+?)(?:and(?=(?:[^']*'[^']*')*[^']*$)|$)/g;
    SPLIT_KEY_OPERATOR_AND_VALUE = /(.+?)(?: (?=(?:[^']*'[^']*')*[^']*$)|$)/g;
    if (stringHelper.has($filter, 'and')) {
        condition = $filter.match(SPLIT_MULTIPLE_CONDITIONS).map(function(s) {
            return stringHelper.removeEndOf(s, 'and').trim();
        });
    } else {
        condition = [$filter.trim()];
    }
    for (_i = 0, _len = condition.length; _i < _len; _i++) {
        item = condition[_i];
        conditionArr = item.match(SPLIT_KEY_OPERATOR_AND_VALUE).map(function(s) {
            return s.trim();
        }).filter(function(n) {
            return n;
        });
        if (conditionArr.length !== 3) {
            throw new Error("Syntax error at '" + item + "'.");
        }
        key = conditionArr[0], odataOperator = conditionArr[1], value = conditionArr[2];
        value = validator.formatValue(value);
        _ref = ['indexof', 'year'];
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            oDataFunction = _ref[_j];
            if (!(key.indexOf("" + oDataFunction + "(") === 0)) {
                continue;
            }
            functions[oDataFunction](query, key, odataOperator, value);
            return;
        }
        switch (odataOperator) {
            case 'eq':
                query.where(key).equals(value);
                break;
            case 'ne':
                query.where(key).ne(value);
                break;
            case 'gt':
                query.where(key).gt(value);
                break;
            case 'ge':
                query.where(key).gte(value);
                break;
            case 'lt':
                query.where(key).lt(value);
                break;
            case 'le':
                query.where(key).lte(value);
                break;
            default:
                throw new Error("Incorrect operator at '" + item + "'.");
        }
    }
};

stringHelper = {
    has: function(str, key) {
        return str.indexOf(key) >= 0;
    },
    isBeginWith: function(str, key) {
        return str.indexOf(key) === 0;
    },
    isEndWith: function(str, key) {
        return str.lastIndexOf(key) === str.length - key.length;
    },
    removeEndOf: function(str, key) {
        if (stringHelper.isEndWith(str, key)) {
            return str.substr(0, str.length - key.length);
        }
        return str;
    }
};

validator = {
    formatValue: function(value) {
        if (value === 'true') {
            return true;
        }
        if (value === 'false') {
            return false;
        }
        if (+value === +value) {
            return +value;
        }
        if (stringHelper.isBeginWith(value, "'") && stringHelper.isEndWith(value, "'")) {
            return value.slice(1, -1);
        }
        throw new Error("Syntax error at '" + value + "'.");
    }
};