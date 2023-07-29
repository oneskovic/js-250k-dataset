var fun   = require("../../../uki-core/function"),
    utils = require("../../../uki-core/utils"),

    rs    = require("../runStatus"),

    Base = require("./base").Base,
    Num  = require("./number").Number;

var STATUS_MAP = {
    1: 'Active',
    3: 'Deleted',
    4: 'Pending',
    5: 'Disapproved',
    8: 'Campaign Paused', // campaign
    9: 'Paused',
    10: 'Draft'
};

var AdgroupStatus = fun.newClass(Num, {
    setTabSeparated: function(obj, value, callback) {
        value = (value + '').toLowerCase();
        var number = 1;

        utils.forEach(STATUS_MAP, function(status, id) {
            if (status.toLowerCase() == value.trim()) {
                number = id;
            }
        });

        this.setValue(obj, number);
        callback();
    },

    getTabSeparated: function(obj) {
        var value = this.getValue(obj);
        return STATUS_MAP[value] || STATUS_MAP[1];
    }
});


var AdgroupStatusAccessor = fun.newClass(Base, {

    originalName: '',

    getValue: function(obj) {
        return STATUS_MAP[obj[this.originalName]()];
    }
});

var RealAdgroupStatus = fun.newClass(Base, {
  originalName: '',

  getValue: function(obj) {
    return obj.realStatus(obj[this.originalName]());
  },

  setValue: function(obj, value) {
    // status needs to be an int in order for realStatus to work
    value *= 1;
    if (value != this.getValue(obj)) {
      // store into adgroup_status in the format of campaign.original_status
      obj.adgroup_status(obj.realStatus(value,
        obj.campaign() && obj.campaign().original_status()));
    }
  }
});

exports.STATUS_MAP = STATUS_MAP;
exports.AdgroupStatus = AdgroupStatus;
exports.AdgroupStatusAccessor = AdgroupStatusAccessor;
exports.RealAdgroupStatus = RealAdgroupStatus;
