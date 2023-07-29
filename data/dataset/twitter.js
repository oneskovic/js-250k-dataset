'use strict';

var _ = require('underscore');
var Twit = require('twit');
var twitConfig = require('./config').twitter; // this is just a hash of credentials
var T = new Twit(twitConfig);

exports.search = search;
exports.cachedSearch = cachedSearch;

/*** straight search against Twitter ***/

function search(query, cb) {
  console.log('running twitter search: ' + JSON.stringify(query));

  T.get('search/tweets', query, function(err, reply) {

    if (err) { return cb(err); }

    var result = _.map(reply.statuses, function(status) {
      var created = new Date(status.created_at);
      return { user: status.user.screen_name, created: created, text: status.text };
    });

    cb(err, result);
  });
}


/*** wrap Twitter search with a cache ***/

var volos = require('./volos');
var cache = volos.Cache.create('twitter', { ttl: 5000, encoding: 'utf8' });

function cachedSearch(query, cb) {
  var key = JSON.stringify(query);

  cache.get(key, function(err, reply) {

    if (reply) {
      console.log('returning response from cache');
      cb(null, reply, true);

    } else {

      search(query, function(err, reply) {
        if (!err) { cache.set(key, JSON.stringify(reply)); }
        cb(err, reply);
      });
    }
  });
}
