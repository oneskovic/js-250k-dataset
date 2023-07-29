module.exports = function(chart) {
  var defs = chart.append('defs');
  // black drop shadow

  var filter = defs.append('filter')
      .attr('id', 'drop-shadow')
      .attr('filterUnits', 'userSpaceOnUse')
      .attr('color-interpolation-filters', 'sRGB');

  var feComponentTransfer = filter.append('feComponentTransfer')
    .attr('in', 'SourceAlpha');

  feComponentTransfer.append('feFuncR')
      .attr('type', 'discrete')
      .attr('tableValues', 0.8);
  feComponentTransfer.append('feFuncG')
      .attr('type', 'discrete')
      .attr('tableValues', 0.8);
  feComponentTransfer.append('feFuncB')
      .attr('type', 'discrete')
      .attr('tableValues', 0.8);

  filter.append('feGaussianBlur')
    .attr('stdDeviation', 1);

  filter.append('feOffset')
      .attr('dx', 1)
      .attr('dy', 0)
      .attr('result', 'shadow');

  filter.append('feComposite')
      .attr('in', 'SourceGraphic')
      .attr('in2', 'shadow')
      .attr('operator', 'over');
};
