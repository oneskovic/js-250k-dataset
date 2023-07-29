var _ = require('lodash');

module.exports = function(classes) {
  if (Object.keys(classes).length > 3) {
    return function(datum) {
      if (datum.value < classes['very-low'].boundary) {
        return 'd3-bg-low';
      }
      else if ((datum.value >= classes['very-low'].boundary) && (datum.value < classes.low.boundary)) {
        return 'd3-bg-low d3-circle-open';
      }
      else if ((datum.value >= classes.low.boundary) && (datum.value <= classes.target.boundary)) {
        return 'd3-bg-target';
      }
      else if ((datum.value > classes.target.boundary) && (datum.value <= classes.high.boundary)) {
        return 'd3-bg-high d3-circle-open';
      }
      else if (datum.value > classes.high.boundary) {
        return 'd3-bg-high';
      }
    };
  }
  else {
    return function(datum) {
      if (datum.value < classes.low.boundary) {
        return 'd3-bg-low';
      }
      else if ((datum.value >= classes.low.boundary) && (datum.value <= classes.target.boundary)) {
        return 'd3-bg-target';
      }
      else if (datum.value > classes.target.boundary) {
        return 'd3-bg-high';
      }
    };
  }
};
