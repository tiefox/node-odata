var odata;

odata = require('../../index');

odata.set('db', 'mongodb://localhost/odata-test');

odata.resources.register({
    url: '/resource-use-function-keyword',
    model: {
        year: Number
    }
});

odata.listen(30002);