var vow = require('vow'),
    notifyNextTick = require('./notifyNextTick');


function Limiter(maxPendingPromises, maxQueuedPromises) {
    this.pendingPromises = 0;
    this.maxPendingPromises = typeof maxPendingPromises !== 'undefined' ? maxPendingPromises : Infinity;
    this.maxQueuedPromises = typeof maxQueuedPromises !== 'undefined' ? maxQueuedPromises : Infinity;
    this.queue = [];
}

/**
 * @param {Function} promiseGenerator
 * @return {Promise}
 */
Limiter.prototype.add = function (promiseGenerator) {
    // Do not queue to much promises
    if (this.queue.length >= this.maxQueuedPromises) {
        return vow.reject('Queue limit reached');
    }
    var promise = vow.promise();

    // Add to queue
    this.queue.push({
        promiseGenerator: promiseGenerator,
        promise: promise
    });

    if (!this._dequeue()) {
        notifyNextTick(promise, 'Request queued');
    }

    return promise;
};

/**
 * @returns {boolean} true if first item removed from queue
 * @private
 */
Limiter.prototype._dequeue = function () {
    var self = this;

    if (this.pendingPromises >= this.maxPendingPromises) {
        return false;
    }

    // Remove from queue
    var item = this.queue.shift();
    if (!item) {
        return false;
    }

    this.pendingPromises++;
    vow.promise(item.promiseGenerator())
        // Forward all stuff
        .then(function (value) {
            // It is not pending now
            self.pendingPromises--;
            self._dequeue();
            // It should pass values
            item.promise.fulfill(value);
        }, function (err) {
            // It is not pending now
            self.pendingPromises--;
            self._dequeue();
            // It should not mask errors
            item.promise.reject(err);
        }, function (message) {
            // It should pass notifications
            item.promise.notify(message);
        });

    return true;
};

module.exports = Limiter;
