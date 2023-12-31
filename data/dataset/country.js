var fs = require('fs');
var dns = require('dns');
var path  = require('path');
var isObject = require('is-object');

//
var info = require('debug')('geoip:lib:country:info');
var debug = require('debug')('geoip:lib:country:debug');

var binding = require('bindings')('native.node');

var validateFile = require('./helpers').validateFile;
var isValidIpORdomain = require('./helpers').isValidIpORdomain;

/**
 * Exports
 */
module.exports = Country;

/**
 * Class
 *
 * @param {String} file
 * @param {Object} options
 */
function Country(file, options) {
    this.types = ['country'];
    this.options = options ? (isObject(options) ? options : {cache: !!options})
                           : ({cache: true});
    //
    validateFile(file, this.types);

    this.native = new binding.Country(path.resolve(file), this.options.cache);

    return this;
}

/**
 * Asynchronously lookup
 * @param {String} ipORdomain
 * @param {Function} callback
 */
Country.prototype.lookup = function(ipORdomain, callback) {
    var self = this;

    //
    if(!isValidIpORdomain(ipORdomain)) {
        self.options.silent ? callback(null, null)
                            : callback(new TypeError('expected string'));
        return;
    }

    dns.lookup(ipORdomain, 4, function(err, address, family) {
        if (err) {
            // See @http://nodejs.org/api/dns.html#dns_error_codes
            debug('Dns error code: %s', err.code);
            return callback.call(self, err);
        }

        info('Address returned from node dns: %s', address);
        info('Family number returned from nod dns: %d', family);

        callback.call(self, null, self.native.lookupSync(address));
    });
};

/**
 * Synchronously lookup
 * @param {String} ipORdomain
 */
Country.prototype.lookupSync = function(ipORdomain) {
    //
    if(!isValidIpORdomain(ipORdomain)) {
        if (this.options.silent) {
            return null;
        } else {
            throw new TypeError('expected string');
        }
    }

    return this.native.lookupSync(ipORdomain);
};

/**
 * Update
 * @param {String} newFile
 * @param {Object} options
 */
Country.prototype.update = function(newFile, options) {
    //
    validateFile(newFile, this.types);

    this.native = new binding.Country(path.resolve(newFile), this.options.cache);

    return this;
};
