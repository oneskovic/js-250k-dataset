var fun   = require("../../../uki-core/function"),
    utils = require("../../../uki-core/utils"),

    FlatArray = require("./flatArray").FlatArray;


var STATUSES = {
    0: 'All',
    1: 'Single',
    2: 'In a Relationship',
    3: 'Married',
    4: 'Engaged'
};

var REGEXPS = {
    0: /all|any/,
    1: /single/,
    2: /relationship/,
    3: /married/,
    4: /engaged/
};

function toString(item) {
    return STATUSES[item] || STATUSES[0];
}

function fromString(item) {
    var number = 0;
    item = item.trim().toLowerCase();

    utils.forEach(REGEXPS, function(regexp, id) {
        if (item.match(regexp)) {
            number = id * 1;
        }
    });
    return number;
}

var RelationshipStatuses = fun.newClass(FlatArray, {
    def: [0],

    setValue: function(obj, value) {
        if (value) {
            value = value.map(function(x) { return x * 1; });
        }
        FlatArray.prototype.setValue.call(this, obj, value);
    },

    getTabSeparated: function(obj) {
        return this.getValue(obj).map(toString);
    },

    setTabSeparated: function(obj, value, callback) {
        this.setValue(obj, value.split(',').map(fromString));
        callback();
    }
});

RelationshipStatuses.STATUSES = STATUSES;
RelationshipStatuses.REGEXPS  = REGEXPS;


exports.RelationshipStatuses = RelationshipStatuses;
