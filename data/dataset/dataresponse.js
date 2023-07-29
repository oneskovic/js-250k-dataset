/**
 * @fileoverview DataResponse containing information about
 * friends, contacts, profile, app data, and activities.
 *
 * Whenever a dataRequest is sent to the server it will return a dataResponse
 * object. Values from the server will be mapped to the requested keys specified
 * in the dataRequest.
 */


/**
 * @class
 * This object contains the requested server data mapped to the requested keys.
 *
 * <p>
 * <b>See also:</b>
 * <a href="opensocial.DataRequest.html">DataRequest</a>
 * </p>
 *
 * @name opensocial.DataResponse
 */

/**
 * Construct the data response.
 * This object contains the requested server data mapped to the requested keys.
 *
 * @param {Map.<String, ResponseItem>} responseItems Key/value map of data
 *    response information
 * @param {Boolean} opt_globalError Optional field indicating whether there were
 *    any errors generating this data response
 *
 * @private
 * @constructor
 */
opensocial.DataResponse = function(responseItems, opt_globalError,
    opt_errorMessage) {
  this.responseItems_ = responseItems;
  this.globalError_ = opt_globalError;
  this.errorMessage_ = opt_errorMessage;
};


/**
 * Returns true if there was an error in fetching this data from the server.
 *
 * @return {Boolean} True if there was an error; otherwise, false
 * @member opensocial.DataResponse
 */
opensocial.DataResponse.prototype.hadError = function() {
  return !!this.globalError_;
};


/**
 * If the entire request had a batch level error, returns the error message.
 *
 * @return {String} A human-readable description of the error that occurred.
 */
opensocial.DataResponse.prototype.getErrorMessage = function() {
  return this.errorMessage_;
};


/**
 * Gets the ResponseItem for the requested field.
 *
 * @return {opensocial.ResponseItem} The requested
 *    <a href="opensocial.ResponseItem.html">response</a> calculated by the
 *    server
 * @member opensocial.DataResponse
 */
opensocial.DataResponse.prototype.get = function(key) {
  return this.responseItems_[key];
};
