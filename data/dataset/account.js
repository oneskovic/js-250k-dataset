var utilFuncs = require('./util'),
	ListIterator = require('./ListIterator'),
	Application = require('./Application'),
	AvailablePhoneNumber = require('./AvailablePhoneNumber');

function Account(client, Sid) {
	this._client = client;
	this.Sid = Sid;
	this._conferences = {};
}
module.exports = Account;
Account.mutableProps = ['FriendlyName', 'Status'];
Account.prototype._getResourceURI = function(type) {
	return this._client._getResourceURI(type) + '/Accounts/' + this.Sid;
}
Account.prototype.load = utilFuncs.globalLoad;
Account.prototype.save = utilFuncs.globalSave;
Account.prototype.closeAccount = function(cb) {
	this.Status = 'closed';
	this.save(cb);
}
Account.prototype.suspendAccount = function(cb) {
	this.Status = 'suspended';
	this.save(cb);
}
Account.prototype.activateAccount = function(cb) {
	this.Status = 'active';
	this.save(cb);
}


Account.prototype.listAvailableLocalNumbers = function(countryCode, filters, cb) {
	var func = utilFuncs.globalList("AvailablePhoneNumbers/" +	countryCode + "/Local",
		AvailablePhoneNumber);
	return func.call(this, filters, cb);
}


Account.prototype.listAvailableTollFreeNumbers = function(countryCode, filters, cb) {
	var func = utilFuncs.globalList("AvailablePhoneNumbers/" +	countryCode + "/TollFree",
		AvailablePhoneNumber);
	return func.call(this, filters, cb);
}


Account.prototype.getApplication = utilFuncs.globalGet(Application);
Account.prototype.listApplications = utilFuncs.globalList("Applications", Application);
Account.prototype.createApplication = utilFuncs.globalCreate("Applications", Application,
	['VoiceUrl', 'VoiceMethod', 'StatusCallback', 'StatusCallbackMethod', 'SmsUrl', 'SmsMethod',
		'SmsStatusCallback'], ['FriendlyName']);

Account.prototype.getRandomConferenceRoomName = function() {
	return "Rand_" + new Date().getTime() + ":" + Math.random(); //good enough for now
}