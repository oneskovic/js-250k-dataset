var t = require('ripple/platform/tizen/2.0/typecast'),
    ContactEmailAddress;

ContactEmailAddress = function (email, types, isDefault) {
    var contactEmailAddress = {};

    t.ContactEmailAddress(arguments, this);

    contactEmailAddress.email     = email;
    contactEmailAddress.isDefault = isDefault || false;
    contactEmailAddress.types     = (types && types[0]) ? types : ["WORK"];

    this.__defineGetter__("email", function () {
        return contactEmailAddress.email;
    });
    this.__defineSetter__("email", function (val) {
        try {
            contactEmailAddress.email = t.DOMString(val);
        } catch (e) {
        }
    });

    this.__defineGetter__("isDefault", function () {
        return contactEmailAddress.isDefault;
    });
    this.__defineSetter__("isDefault", function (val) {
        try {
            contactEmailAddress.isDefault = t.boolean(val);
        } catch (e) {
        }
    });

    this.__defineGetter__("types", function () {
        return contactEmailAddress.types;
    });
    this.__defineSetter__("types", function (val) {
        try {
            contactEmailAddress.types = t.DOMString(val, "[]");
        } catch (e) {
        }
    });
};

module.exports = ContactEmailAddress;
