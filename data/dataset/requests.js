var util        = require('util'),
    Client      = require('./client').Client,
    defaultUser = require('./helpers').defaultUser;


var Requests = exports.Requests = function (options) {
  this.jsonAPIName = 'requests';
  this.jsonAPIName2 = 'request';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Requests, Client);

// ######################################################## Requests
// ====================================== Listing Requests
Requests.prototype.list = function (cb) {
  this.requestAll('GET', ['requests'], cb);//all
};

Requests.prototype.listOpen = function (cb) {
  this.requestAll('GET', ['requests', 'open'], cb);//all
};

Requests.prototype.listSolved = function (cb) {
  this.requestAll('GET', ['requests', 'solved'], cb);//all
};

Requests.prototype.listCCD = function (orgID, cb) {
  this.requestAll('GET', ['requests', 'ccd'], cb);//all
};

Requests.prototype.listByUser = function (userID, cb) {
  this.requestAll('GET', ['users', userID, 'requests'], cb);//all
};

Requests.prototype.listByOrganization = function (orgID, cb) {
  this.requestAll('GET', ['organizations', orgID, 'requests'], cb);//all
};

// ====================================== Viewing Requests
Requests.prototype.getRequest = function (requestID, cb) {
  this.request('GET', ['requests', requestID], cb);
};

// ====================================== Creating Requests
Requests.prototype.create = function (request, cb) {
  this.request('POST', ['requests'], request,  cb);
};

// ====================================== Updating Requests
Requests.prototype.update = function (requestID, request, cb) {
  this.request('PUT', ['requests', requestID], request,  cb);
};

// ====================================== Listing Comments
Requests.prototype.listComments = function (requestID, cb) {
  this.requestAll('GET', ['requests', requestID, 'comments'], cb);//all
};

// ====================================== Get Comment
Requests.prototype.getComment = function (requestID, commentID, cb) {
  this.requestAll('GET', ['requests', requestID, 'comments', commentID], cb);
};
