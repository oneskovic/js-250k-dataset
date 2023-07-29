/**
 * BarChart
 * @alternateClassName BarChart
 * @extends _Chart
 */
define('argos/Charts/BarChart', [
    'dojo/_base/declare',
    'dojo/window',
    'dojo/dom-geometry',
    './_Chart',
    'dojox/charting/plot2d/Bars',
    'dojox/charting/axis2d/Default'
], function(
    declare,
    win,
    domGeom,
    _Chart,
    Bars
) {
    return declare('argos.Charts.BarChart', [_Chart], {
        xAxis: {
            fixLower: 'major',
            fixUpper: 'major',
            minorTicks: false
        },
        yAxis: {
            vertical: true,
            fixLower: 'major',
            fixUpper: 'none',
            minorTicks: false
        },
        plotType: Bars,
        plotOptions: {
            gap: 5
        },

        getAxes: function() {
            var axes = this.inherited(arguments);

            if (this.feed)
                axes[0].options.maxLabelSize = Math.floor(domGeom.getMarginBox(this.chartNode).w / (this.feed.length + 3.5));

            return axes;
        },
        setSize: function() {
            this.inherited(arguments);

            if (this.chart && this.chart.axes['x'] && this.feed)
            {
                var axes = this.getAxes();
                this.chart.addAxis(axes[0].axis, axes[0].options);
            }
        }
    });
});