/**
 * ColumnChart
 * @alternateClassName ColumnChart
 * @extends _Chart
 */
define('argos/Charts/ColumnChart', [
    'dojo/_base/declare',
    'dojo/dom-geometry',
    './_Chart',
    'dojox/charting/plot2d/Columns',
    'dojox/charting/plot2d/Markers',
    'dojox/charting/axis2d/Default'
], function(
    declare,
    domGeom,
    _Chart,
    Columns
) {
    return declare('argos.Charts.ColumnChart', [_Chart], {
        plotType: Columns,

        plotOptions: {
            markers: true,
            gap: 5
        },

        xAxis: {
            natural: true,
            trailingSymbol: '...'
        },

        yAxis: {
            vertical: true,
            fixLower: 'major',
            fixUpper: 'major',
            minorTicks: false
        }
    });
});