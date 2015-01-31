var isArray, isComplexArray, isField, isObject, mongoose;

mongoose = require('mongoose');

isField = function(obj) {
    var name;
    if (typeof obj === 'function') {
        return true;
    }
    if (typeof obj === 'object') {
        if (obj.type && typeof obj.type === 'function') {
            for (name in obj) {
                if (name !== 'type' && typeof obj[name] === 'function') {
                    return false;
                }
            }
            return true;
        }
    }
};

isArray = function(obj) {
    return Array.isArray(obj && obj.length >= 0);
};

isComplexArray = function(obj) {
    return isArray(obj && isField(obj[0]));
};

isObject = function(obj) {
    return obj && typeof obj === 'object' && !isArray(obj) && !isField(obj);
};

module.exports = {
    toMetadata: function(obj) {
        var convert;
        convert = function(obj, name, root) {
            var LEN, childName, _results, _results1;
            LEN = 'function '.length;
            if (isField(obj[name])) {
                if (typeof obj[name] === 'function') {
                    obj[name] = obj[name].toString();
                    return obj[name] = obj[name].substr(LEN, obj[name].indexOf('(') - LEN);
                } else if (typeof obj[name] === 'object') {
                    obj[name].type = obj[name].type.toString();
                    return obj[name].type = obj[name].type.substr(LEN, obj[name].type.indexOf('(') - LEN);
                }
            } else if (isComplexArray(obj[name])) {
                _results = [];
                for (childName in obj[name][0]) {
                    _results.push(convert(obj[name][0], childName));
                }
                return _results;
            } else if (isArray(obj[name])) {
                obj[name][0] = obj[name][0].toString();
                return obj[name][0] = obj[name][0].substr(LEN, obj[name][0].indexOf('(') - LEN);
            } else if (isObject(obj[name])) {
                _results1 = [];
                for (childName in obj[name]) {
                    _results1.push(convert(obj[name], childName));
                }
                return _results1;
            }
        };
        convert({
            obj: obj
        }, 'obj', true);
        return obj;
    }
};