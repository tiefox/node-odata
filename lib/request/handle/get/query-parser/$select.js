var __indexOf = [].indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item) return i;
    }
    return -1;
};

module.exports = function(query, $select) {
    var item, list, selectFields, _i, _len, _ref;
    if (!$select) {
        return;
    }
    list = $select.split(',').map(function(item) {
        return item.trim();
    });
    selectFields = {
        _id: 0
    };
    _ref = Object.keys(query.model.schema.tree);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if (__indexOf.call(list, item) >= 0) {
            if (item === 'id') {
                item = '_id';
            }
            selectFields[item] = 1;
        }
    }

    /*
    todo: 下面这种处理方式会导致无法使用 $select=field.subField 来筛选二级或更下级的字段
     * 这里使用排除的方式(如: { a: 0, b: 0, c: 0 })而没有使用包含的方式(如: { x: 1, y: 1 })
     * 来确定需要选择的字段是因为如果使用包含的方式, 那些被隐藏的字段就有可能被意外选择出来, 因为
     * Resource 的数据结构可能会很复杂, 如果采用包含的方式需要逐个判断其 select 属性的状态, 较
     * 为繁琐. 所以这里使用了排除所有字段, 再去掉 $select 中包含的字段的方式来实现.
    selectFields = {}
    for item in Object.keys(query.model.schema.tree)
      selectFields[item] = 0
    for item in list
      delete selectFields[item]
     */
    return query.select(selectFields);
};