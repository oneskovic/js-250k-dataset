var _ = require('lodash');

var format = require('../../data/util/format');

module.exports = {
  getRecommended: function(d) {
    if (!d.recommended) {
      return NaN;
    }
    if (d.recommended.net != null) {
      return d.recommended.net;
    }
    var rec = 0;
    if (d.recommended.carb) {
      rec += d.recommended.carb;
    }
    if (d.recommended.correction) {
      rec += d.recommended.correction;
    }
    return format.fixFloatingPoint(rec);
  },
  getMaxValue: function(d) {
    var wiz;
    if (d.type === 'wizard') {
      if (d.bolus) {
        wiz = _.clone(d);
        d = d.bolus;
      }
      else {
        return NaN;
      }
    }
    var programmedTotal = this.getProgrammed(d);
    var rec = 0;
    if (wiz) {
      rec = this.getRecommended(wiz); 
    }
    return rec > programmedTotal ? rec : programmedTotal;
  },
  getDelivered: function(d) {
    if (d.type === 'wizard') {
      if (d.bolus) {
        d = d.bolus;
      }
      else {
        return NaN;
      }
    }
    if (d.extended != null) {
      if (d.normal != null) {
        return format.fixFloatingPoint(d.extended + d.normal);
      }
      else {
        return d.extended;
      }
    }
    else {
      return d.normal;
    }
  },
  getProgrammed: function(d) {
    if (d.type === 'wizard') {
      if (d.bolus) {
        d = d.bolus;
      }
      else {
        return NaN;
      }
    }
    if (d.extended != null && d.expectedExtended != null) {
      if (d.normal != null) {
        if (d.expectedNormal != null) {
          return format.fixFloatingPoint(d.expectedNormal + d.expectedExtended);
        }
        else {
          return format.fixFloatingPoint(d.normal + d.expectedExtended);
        }
      }
      else {
        return d.expectedExtended;
      }
    }
    else if (d.extended != null) {
      if (d.normal != null) {
        if (d.expectedNormal != null) {
          return format.fixFloatingPoint(d.expectedNormal + d.extended);
        }
        else {
          return format.fixFloatingPoint(d.normal + d.extended);
        }
      }
      else {
        return d.extended;
      }
    }
    else {
      return d.expectedNormal || d.normal;
    }
  },
  getMaxDuration: function(d) {
    if (d.type === 'wizard') {
      if (d.bolus) {
        d = d.bolus;
      }
      else {
        return NaN;
      }
    }
    // don't want truthiness here because want to return expectedDuration
    // from a bolus interrupted immediately (duration = 0)
    if (d.duration == null) {
      return NaN;
    }
    return d.expectedDuration || d.duration;
  }
};