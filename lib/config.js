var mongoose, _options;

mongoose = require('mongoose');

_options = {
    app: void 0,
    db: void 0,
    prefix: '/oData'
};

module.exports = {
    get: function(key) {
        return _options[key];
    },
    set: function(key, value) {
        if (key === 'db') {
            if (_options[key] === value) {
                return;
            }
            if (_options[key]) {
                throw new Error("db already set before, you can't set it again.");
            }
            mongoose.connect(value);
        }
        return _options[key] = value;
    }
};