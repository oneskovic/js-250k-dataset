var async = require('async'),
    ErrorHandler = require('../utils/ErrorHandler.js');

module.exports = function flick (selector, xoffset, yoffset, speed) {

    /*!
     * make sure that callback contains chainit callback
     */
    var callback = arguments[arguments.length - 1];

    var self = this,
        response = {};

    /*!
     * mobile check
     */
    if(!this.isMobile) {
        return callback(new ErrorHandler.CommandError('flick command is not supported on non mobile platforms'));
    }

    if(arguments.length === 3 && typeof selector === 'number' && typeof xoffset === 'number') {

        /*!
         * you don't care where the flick starts on the screen
         */

        var xspeed = arguments[0],
            yspeed = arguments[1];

        async.waterfall([
            function(cb) {
                self.touchFlick(xspeed, yspeed, cb);
            },
            function(res, cb) {
                response.touchFlick = res;
                cb();
            }
        ], function(err) {

            callback(err, null, response);

        });

    } else {

        /*!
         * command starts at a particular screen location
         */

        async.waterfall([
            function(cb) {
                self.element(selector, cb);
            },
            function(res, cb) {
                response.element = res;

                if(!res.value.ELEMENT) {
                    return callback(null, null, response);
                }

                self.touchFlick(res.value.ELEMENT.toString(), xoffset, yoffset, speed, cb);
            },
            function(res, cb) {
                response.touchFlick = res;
                cb();
            }
        ], function(err) {

            callback(err, null, response);

        });

    }

};

