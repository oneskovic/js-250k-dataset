Ext.define('Ext.chart.series.Scatter', {

    extend: 'Ext.chart.series.Cartesian',

    alias: 'series.scatter',

    type: 'scatter',
    seriesType: 'scatterSeries',

    requires: [
        'Ext.chart.series.sprite.Scatter'
    ],

    config: {
        itemInstancing: {
            fx: {
                customDuration: {
                    translationX: 0,
                    translationY: 0
                }
            }
        }
    },

    applyMarker: function (marker) {
        this.getItemInstancing();
        this.setItemInstancing(marker);
    },

    provideLegendInfo: function (target) {
        var style = this.config.marker;
        target.push({
            name: this.getTitle() || this.getYField() || this.getId(),
            mark: style.fill || style.stroke || 'black',
            disabled: false,
            series: this.getId(),
            index: 0
        });
    }
});

