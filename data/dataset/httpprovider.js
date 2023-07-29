/** @file httpprovider.js
 * @authors:
 *   Marek Kotewicz <marek@ethdev.com>
 *   Marian Oancea <marian@ethdev.com>
 *   Fabian Vogelsteller <fabian@ethdev.com>
 * @date 2014
 */

"use strict";

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; // jshint ignore:line

var HttpProvider = function (host) {
    this.host = host || 'http://localhost:8080';
};

HttpProvider.prototype.send = function (payload) {
    var request = new XMLHttpRequest();

    request.open('POST', this.host, false);
    request.send(JSON.stringify(payload));

    // check request.status
    // TODO: throw an error here! it cannot silently fail!!!
    //if (request.status !== 200) {
        //return;
    //}
    return JSON.parse(request.responseText);
};

HttpProvider.prototype.sendAsync = function (payload, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            // TODO: handle the error properly here!!!
            callback(null, JSON.parse(request.responseText));
        }
    };

    request.open('POST', this.host, true);
    request.send(JSON.stringify(payload));
};

module.exports = HttpProvider;

