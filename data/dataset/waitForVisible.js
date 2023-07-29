var async = require('async'),
    isVisibleFunc = require('../helpers/_isVisible.js'),
    ErrorHandler = require('../utils/ErrorHandler.js');

module.exports = function waitForVisible(selector, ms, reverse) {

    /*!
     * make sure that callback contains chainit callback
     */
    var callback = arguments[arguments.length - 1];

    /*!
     * parameter check
     */
    if (typeof selector !== 'string') {
        return callback(new ErrorHandler.CommandError('number or type of arguments don\'t agree with waitForVisible command'));
    }

    /*!
     * ensure that ms is set properly
     */
    if (typeof ms !== 'number') {
        ms = this.options.waitforTimeout;
    }

    if (typeof reverse !== 'boolean') {
        reverse = false;
    }

    var self = this,
        response = {};

    async.waterfall([
        function(cb) {
            self.timeoutsAsyncScript(ms, cb);
        },
        function(res, cb) {
            response.timeoutsAsyncScript = res;
            self.selectorExecuteAsync(selector, isVisibleFunc, reverse, cb);
        },
        function(result, res, cb) {
            response.selectorExecuteAsync = res;
            cb();
        }
    ], function(err) {

        callback(err, response.selectorExecuteAsync && response.selectorExecuteAsync.executeAsync ? response.selectorExecuteAsync.executeAsync.value : false, response);

    });

};
