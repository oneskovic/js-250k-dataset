var exports = module.exports;

var SchedulerClient = require('./schedulerClient');
exports.SchedulerClient = SchedulerClient;

/**
* Creates a new {@link SchedulerClient} object.
*
* NOTE: These APIs are still in development and should not be used.
*
* @param {string} [credentials.subscriptionId]      The subscription identifier.
* @param {string} [credentials.cert]                The cert value.
* @param {string} [credentials.key]                 The key value.
* @param {string} cloudServiceName
*
* @param {string} jobCollectionName
* @param {string} [baseUri]                         The base uri.
* @param {array}  [filters]                         Optional array of service filters
* @return {SchedulerClient}                         A new SchedulerClient object.
*/
exports.createSchedulerClient = function (credentials, cloudServiceName, jobCollectionName, baseUri, filters) {
  return new exports.SchedulerClient.SchedulerClient(credentials, cloudServiceName, jobCollectionName, baseUri, filters);
};

var common = require('azure-common');

/**
* Creates a new CertificateCloudCredentials object.
* Either a pair of cert / key values need to be pass or a pem file location.
*
* @param {string} credentials.subscription  The subscription identifier.
* @param {string} [credentials.cert]        The certificate.
* @param {string} [credentials.key]         The certificate key.
* @param {string} [credentials.pem]         The PEM file content.
* @return {CertificateCloudCredentials}
*/
exports.createCertificateCloudCredentials = function (credentials) {
  return new common.CertificateCloudCredentials(credentials);
};