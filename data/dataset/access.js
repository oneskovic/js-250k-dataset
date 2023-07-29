var _ = require('lodash');

var common = require('./common');

var patch = function(mock, api) {
  var data = mock.data;
  var getParam = mock.getParam;
  var getDelayFor = mock.getDelayFor;

  var setPermissions = common.setPermissions.bind(null, data);

  api.access.setMemberPermissions = function(memberId, permissions, callback) {
    var groupId = api.userId;
    api.log('[mock] PUT /access/' + groupId + '/' + memberId);

    setTimeout(function() {
      setPermissions(groupId, memberId, permissions);
      callback();
    }, getDelayFor('api.access.setMemberPermissions'));
  };

  api.access.removeMember = function(memberId, callback) {
    var groupId = api.userId;
    api.log('[mock] DELETE /access/' + groupId + '/' + memberId);

    setTimeout(function() {
      setPermissions(groupId, memberId, null);
      callback();
    }, getDelayFor('api.access.removeMember'));
  };

  api.access.leaveGroup = function(groupId, callback) {
    var memberId = api.userId;
    api.log('[mock] DELETE /access/' + groupId + '/' + memberId);

    setTimeout(function() {
      setPermissions(groupId, memberId, null);
      callback();
    }, getDelayFor('api.access.leaveGroup'));
  };

  return api;
};

module.exports = patch;
