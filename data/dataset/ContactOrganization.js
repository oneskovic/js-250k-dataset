var t = require('ripple/platform/tizen/2.0/typecast'),
    ContactOrganization;

ContactOrganization = function (orgInitDict) {
    var contactOrganization = {}, attr;

    t.ContactOrganization(arguments, this);

    contactOrganization.name       = null;
    contactOrganization.department = null;
    contactOrganization.title      = null;
    contactOrganization.role       = null;
    contactOrganization.logoURI    = null;

    this.__defineGetter__("name", function () {
        return contactOrganization.name;
    });
    this.__defineSetter__("name", function (val) {
        try {
            contactOrganization.name = t.DOMString(val, "?");
        } catch (e) {
        }
    });

    this.__defineGetter__("department", function () {
        return contactOrganization.department;
    });
    this.__defineSetter__("department", function (val) {
        try {
            contactOrganization.department = t.DOMString(val, "?");
        } catch (e) {
        }
    });

    this.__defineGetter__("title", function () {
        return contactOrganization.title;
    });
    this.__defineSetter__("title", function (val) {
        try {
            contactOrganization.title = t.DOMString(val, "?");
        } catch (e) {
        }
    });

    this.__defineGetter__("role", function () {
        return contactOrganization.role;
    });
    this.__defineSetter__("role", function (val) {
        try {
            contactOrganization.role = t.DOMString(val, "?");
        } catch (e) {
        }
    });

    this.__defineGetter__("logoURI", function () {
        return contactOrganization.logoURI;
    });
    this.__defineSetter__("logoURI", function (val) {
        try {
            contactOrganization.logoURI = t.DOMString(val, "?");
        } catch (e) {
        }
    });

    if (orgInitDict) {
        for (attr in orgInitDict) {
            contactOrganization[attr] = orgInitDict[attr];
        }
    }
};

module.exports = ContactOrganization;
