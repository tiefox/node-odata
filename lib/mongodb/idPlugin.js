var exports, uuid;

uuid = require('node-uuid');

module.exports = exports = function(schema, options) {
    var remove;
    if (!schema.paths._id) {
        schema.add({
            _id: {
                type: String,
                unique: true
            }
        });
    }
    if (!schema.paths.id) {
        schema.virtual('id').get(function() {
            return this._id;
        });
        schema.set('toObject', {
            virtuals: true
        });
        schema.set('toJSON', {
            virtuals: true
        });
    }
    remove = function(doc, ret, options) {
        delete ret._id;
        if (!ret.id) {
            delete ret.id;
        }
        return ret;
    };
    if (!schema.options.toObject) {
        schema.options.toObject = {};
    }
    if (!schema.options.toJSON) {
        schema.options.toJSON = {};
    }
    schema.options.toObject.transform = remove;
    schema.options.toJSON.transform = remove;
    return schema.pre('save', function(next) {
        if (this.isNew && !this._id) {
            this._id = uuid.v4();
        }
        return next();
    });
};