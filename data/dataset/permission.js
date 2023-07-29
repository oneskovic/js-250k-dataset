function Permission(json) {
    for(var key in json) {
        if(json.hasOwnProperty(key)) {
            this[key] = json[key];
        }
    }
}

/**
 * Creates a permission with the Nitrogen service.
 *
 * @method create
 * @async
 * @param {Object} session An open session with a Nitrogen service.
 * @param {Function} callback Callback function of the form f(err, permission).
 **/

Permission.prototype.create = function(session, callback) {
    session.post({ url: session.service.config.endpoints.permissions, json: this }, function(err, resp, body) {
        if (err) return callback(err);
        if (resp.statusCode != 200) return callback(body);

        if (callback) callback(null, new Permission(body.permission));
    });
};

/**
 * Find permissions filtered by the passed query and limited to and sorted by the
 * passed options.
 *
 * @method find
 * @async
 * @param {Object} session An open session with a Nitrogen service.
 * @param {Object} query A query using MongoDB query format.
 * @param {Object} options Options for the query:  'limit': maximum number of results to be returned. 'sort': The field that the results should be sorted on, 'dir': The direction that the results  should be sorted. 'skip': The number of results that should be skipped before pulling results.
 * @param {Function} callback Callback function of the form f(err, permissions).
 **/

Permission.find = function(session, query, options, callback) {
    if (!session) return callback(new Error("session required for find"));
    if (!callback || typeof callback !== 'function') return callback(new Error('callback required for find.'));

    session.get({
        url: session.service.config.endpoints.permissions,
        query: query,
        queryOptions: options,
        json: true
    }, function(err, resp, body) {
        if (err) return callback(err);

        var permissions = body.permissions.map(function(permission) {
            return new Permission(permission);
        });

        callback(null, permissions);
    });
};

/**
 * Delete this permission from the service.
 *
 * @method remove
 * @async
 * @param {Object} session An open session with a Nitrogen service.
 * @param {Function} callback Callback function of the form f(err).
 **/

Permission.prototype.remove = function(session, callback) {
    var self = this;

    session.remove({ url: session.service.config.endpoints.permissions + "/" + this.id }, function(err) {
        return callback(err);
    });
};

/**
 * Save this permission to the service.
 *
 * @method save
 * @async
 * @param {Object} session An open session with a Nitrogen service.
 * @param {Function} callback Callback function of the form f(err, permission).
 **/

Permission.prototype.save = function(session, callback) {
    if (!this.id) return callback("Permission must have id to be saved.");

    session.put({ url: session.service.config.endpoints.permissions + "/" + this.id, json: this }, function(err, resp, body) {
        if (err) return callback(err);
        if (resp.statusCode != 200) return callback(body, null);

        if (callback) callback(null, new Permission(body.permission));
    });
};

Permission.NORMAL_PRIORITY = 10000000;

module.exports = Permission;