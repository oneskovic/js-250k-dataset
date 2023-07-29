// recommendations.js:
// Handles requests related to recommendations (/recommendations).

var config = require('./util/config');
var searchUtils = require('./util/do_search');
var session = require('./util/session');
var api = require('./util/api');
var url = require('url');

var recommendationNs = 'http://buddycloud.com/channel_directory/recommendation_query';

/**
 * Registers resource URL handlers.
 */
exports.setup = function(app) {
  app.get('/recommendations',
           session.provider,
           getRecommendations);
};

//// GET /recommendations /////////////////////////////////////////////////////////////

function getRecommendations(req, res) {
  var params = url.parse(req.url, true).query;
  
  var user = params.user;
  var max = params.max;
  var index = params.index;

  if (!user) {
    res.send(400);
    return;
  }
  
  requestRecommendations(req, res, user, max, index, function(reply) {
    var items = searchUtils.channelsToJSON(reply, recommendationNs);
    var rsm = searchUtils.rsmToJSON(reply);
    var body = {items: items, rsm: rsm};
    res.contentType('json');
    res.send(body);
  });
}

function requestRecommendations(req, res, user, max, index, callback) {
  var searchIq = searchUtils.recommend(user, max, index);
  api.sendQueryToSearch(req, res, searchIq, callback);
}