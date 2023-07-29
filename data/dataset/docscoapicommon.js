
 (function (window, undefined) {
    var asc = window["Asc"] ? window["Asc"] : (window["Asc"] = {});
    var prot;
    function asc_CUser() {
        if (! (this instanceof asc_CUser)) {
            return new asc_CUser();
        }
        this.id = null;
        this.userName = null;
        this.state = undefined;
        return this;
    }
    asc_CUser.prototype = {
        constructor: asc_CUser,
        asc_getId: function () {
            return this.id;
        },
        asc_getUserName: function () {
            return this.userName;
        },
        asc_getState: function () {
            return this.state;
        },
        asc_setId: function (val) {
            this.id = val;
        },
        asc_setUserName: function (val) {
            this.userName = val;
        },
        asc_setState: function (val) {
            this.state = val;
        }
    };
    window["Asc"]["asc_CUser"] = window["Asc"].asc_CUser = asc_CUser;
    prot = asc_CUser.prototype;
    prot["asc_getId"] = prot.asc_getId;
    prot["asc_getUserName"] = prot.asc_getUserName;
    prot["asc_getState"] = prot.asc_getState;
    prot["asc_setId"] = prot.asc_setId;
    prot["asc_setUserName"] = prot.asc_setUserName;
    prot["asc_setState"] = prot.asc_setState;
})(window);