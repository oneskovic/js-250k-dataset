"use strict";

tutao.provide('tutao.entity.sys.MailAddressAvailabilityData');


tutao.entity.sys.MailAddressAvailabilityData = function(data) {
  if (data) {
    this.updateData(data);
  } else {
    this.__format = "0";
    this._mailAddress = null;
  }
  this._entityHelper = new tutao.entity.EntityHelper(this);
  this.prototype = tutao.entity.sys.MailAddressAvailabilityData.prototype;
};

/**
 * Updates the data of this entity.
 * @param {Object=} data The json data to store in this entity.
 */
tutao.entity.sys.MailAddressAvailabilityData.prototype.updateData = function(data) {
  this.__format = data._format;
  this._mailAddress = data.mailAddress;
};

/**
 * The version of the model this type belongs to.
 * @const
 */
tutao.entity.sys.MailAddressAvailabilityData.MODEL_VERSION = '8';

/**
 * The encrypted flag.
 * @const
 */
tutao.entity.sys.MailAddressAvailabilityData.prototype.ENCRYPTED = false;

/**
 * Provides the data of this instances as an object that can be converted to json.
 * @return {Object} The json object.
 */
tutao.entity.sys.MailAddressAvailabilityData.prototype.toJsonData = function() {
  return {
    _format: this.__format, 
    mailAddress: this._mailAddress
  };
};

/**
 * The id of the MailAddressAvailabilityData type.
 */
tutao.entity.sys.MailAddressAvailabilityData.prototype.TYPE_ID = 309;

/**
 * The id of the mailAddress attribute.
 */
tutao.entity.sys.MailAddressAvailabilityData.prototype.MAILADDRESS_ATTRIBUTE_ID = 311;

/**
 * Sets the format of this MailAddressAvailabilityData.
 * @param {string} format The format of this MailAddressAvailabilityData.
 */
tutao.entity.sys.MailAddressAvailabilityData.prototype.setFormat = function(format) {
  this.__format = format;
  return this;
};

/**
 * Provides the format of this MailAddressAvailabilityData.
 * @return {string} The format of this MailAddressAvailabilityData.
 */
tutao.entity.sys.MailAddressAvailabilityData.prototype.getFormat = function() {
  return this.__format;
};

/**
 * Sets the mailAddress of this MailAddressAvailabilityData.
 * @param {string} mailAddress The mailAddress of this MailAddressAvailabilityData.
 */
tutao.entity.sys.MailAddressAvailabilityData.prototype.setMailAddress = function(mailAddress) {
  this._mailAddress = mailAddress;
  return this;
};

/**
 * Provides the mailAddress of this MailAddressAvailabilityData.
 * @return {string} The mailAddress of this MailAddressAvailabilityData.
 */
tutao.entity.sys.MailAddressAvailabilityData.prototype.getMailAddress = function() {
  return this._mailAddress;
};
