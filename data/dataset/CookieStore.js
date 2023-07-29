var d = require('describe-property');
var Promise = require('../../utils/Promise');


function CookieStore(options) {
  options = options || {};

  this.ttl = options.expireAfter
    ? (1000 * options.expireAfter) // expireAfter is given in seconds
    : 0;
}

Object.defineProperties(CookieStore.prototype, {

  load: d(function (value) {
    var session;
    try {
      session = JSON.parse(value);
    } catch (error) {
      // Ignore invalid JSON data.
      return Promise.resolve({});
    }

    // Verify the session is not expired.
    if (session._expiry && session._expiry <= Date.now())
      return Promise.resolve({});

    return Promise.resolve(session);
  }),

  save: d(function (session) {
    if (this.ttl)
      session._expiry = Date.now() + this.ttl;

    return Promise.resolve(JSON.stringify(session));
  })

});

module.exports = CookieStore;
