var request = require('request'),
    url     = require('url'),
    rdv     = require('rendezvous'),
    tocsv   = require('./tocsv');


module.exports = function(expression, options, cb) {
  var query = buildQuery(expression, options);

  request.get(query, function(err, res, body) {
    if(err)
      cb(err);
    else if(res.statusCode !== 200)
      cb(new Error(body));
    else {
      var parsed;
      switch(options.format) {
        case 'json':
          cb(body);
          break;
        case 'csv':
          parsed = JSON.parse(body).map(function(val){
            val.time = new Date(val.time);
            return val;
          });
          cb(tocsv(parsed, options.inverse));
          break;
        default :
          parsed = JSON.parse(body).map(function(val){
            val.time = new Date(val.time);
            return val;
          });
          cb(parsed);
          break;
      }
    }
  });
};

/*
 * Build query for fetching metrics.
 * @param  {String} expression - cube metric expression
 * @param  {Object} options    - @see options of #metric
 * @return {String} generated query
 */
var buildQuery = function(expression, options) {
  var step = (typeof options.step === 'string') ? rdv.duration(options.step) : options.step;
  if(step === false)
    throw new Error(options.step + ': invalid rendezvous duration expression');
  if([1e4, 6e4, 3e5, 36e5, 864e5].indexOf(step) === -1)
    throw new Error(options.step+' is not a supported resolution');

  var start;
  if(options.start) {
    start = (options.start instanceof Date) ? options.start : rdv(options.start);
    if(start === false)
      throw new Error(options.start + ': invalid rendezvous expression');
  }

  var stop;
  if(options.stop) {
    stop = (options.stop instanceof Date) ? options.stop : rdv(options.stop);
    if(stop === false)
      throw new Error(options.stop + ': invalid rendezvous expression');
  }

  if(options.over) {
    var over = rdv.duration(options.over);
    if(over === false)
      throw new Error(options.over + ': invalid rendezvous duration expression');

    if(!start && stop ) start = new Date( stop.valueOf() -over);
    if(!stop  && start) stop  = new Date(start.valueOf() +over);
  }
  
  var limit;
  if(options.limit) {
    if(typeof options.limit === 'string') {
      var duration = rdv.duration(options.limit);
      if(duration === false)
        throw new Error(options.limit + ': invalid rendezvous duration expression');

      limit = Math.floor(duration/step);
    }
    else limit = options.limit;
  }

  var query = {};
  query.expression = expression;
  query.step = step;
  if(start) query.start = start.toISOString();
  if(stop)  query.stop  = stop.toISOString();
  if(limit) query.limit = limit;

  return url.format({
    protocol : 'http',
    host : options.host,
    pathname : '1.0/metric/get',
    query : query
  });
};

module.exports.buildQuery = buildQuery;