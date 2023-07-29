"use strict";

var config = {
  organization: 'ORGANIZATION',
  uri: 'https://ORGANIZATION-test.apigee.net/apigee-remote-proxy',
  key: 'CONSUMER KEY',
  secret: 'CONSUMER SECRET',

  validGrantTypes: [ 'client_credentials', 'authorization_code', 'implicit_grant', 'password' ],
  passwordCheck: checkPassword
};

function checkPassword(username, password, cb) {
  cb(null, true);
}

var Management = require('volos-management-apigee');
var management = Management.create(config);

var OAuth = require('volos-oauth-apigee');
var oauth = OAuth.create(config);

module.exports = {
  management: management,
  oauth: oauth,
  config: config,
  localPort: 10010
};
