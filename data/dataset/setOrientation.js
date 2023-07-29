var async = require('async'),
    ErrorHandler = require('../utils/ErrorHandler.js');

module.exports = function setOrientation (orientation) {

    /*!
     * make sure that callback contains chainit callback
     */
    var callback = arguments[arguments.length - 1];

    /*!
     * parameter check
     */
    if(typeof orientation !== 'string') {
        return callback(new ErrorHandler.CommandError('number or type of arguments don\'t agree with setOrientation command'));
    }

    var self = this,
        response = {};

    async.waterfall([
        function(cb) {
            self.orientation(orientation.toUpperCase(), cb);
        },
        function(res, cb) {
            response.orientation = res;
            cb();
        }
    ], function(err) {

        callback(err,null,response);

    });

};