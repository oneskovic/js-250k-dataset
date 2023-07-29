var vows = require('vows');

var tests = [
    'array',
    'bank-instance',
    'basic-crud',
    'connection',
    'extreme-ids',
    'float',
    'integer',
    'key-error',
    'object-create-hook',
    'object-del-hook',
    'object-get-hook',
    'object-readall-hook',
    'object-readall',
    'object-readarray-hook',
    'object-readarray',
    'object-save-hook',
    'object-scan',
    'object',
    'object-update-hook',
    'object-delete-and-search',
    'object-delete-property-on-save',
    'readall',
    'save',
    'scan',
    'search'
];

var DriverTest = function(driver, params) {

    var suite = vows.describe(driver + 'databank driver test'),
        maker, i, ctx;

    for (i = 0; i < tests.length; i++) {
        maker = require('./test/'+tests[i]);
        ctx = {};
        ctx[tests[i]] = maker(driver, params);
        suite.addBatch(ctx);
    }

    return suite;
};

exports.DriverTest = DriverTest;
