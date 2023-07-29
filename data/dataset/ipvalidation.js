var Cidr = require('swiz').Cidr;
var net = require('net');
var log = require('logmagic').local('ipvalidation');

var settings = require('../../util/settings');

var acceptCidrs = settings.DASHBOARD_IP_WHITELIST.map(function(cidr) {
  return new Cidr(cidr);
});

exports.isAccepted = function(ip) {
  var i = 0;
  for (i = 0; i < acceptCidrs.length; i++) {
    if (acceptCidrs[i].isInCIDR(ip)) {
      return true;
    }
  }
  return false;
};

exports.getIp = function(req) {
  var fwdStr = req.headers['x-forwarded-for'],
      ipAddr;
  if (fwdStr) {
    ipAddr = fwdStr.split(',')[0];
  } else {
    ipAddr = req.connection.remoteAddress;
  }
  return ipAddr;
};

exports.attachIPValidationMiddleware = function attachIPValidationMiddleware() {
  return function validateIP(req, res, next) {
    var ip = exports.getIp(req);
    if (!exports.isAccepted(ip)) {
      // 403 forbidden
      log.error('IP Exception for ' + ip);
      res.render('status.jade', {
        code:403,
        message: '403 Forbidden (bad IP)',
        title: '403 Forbidden'
      });
    } else {
      next();
    }
  };
};
