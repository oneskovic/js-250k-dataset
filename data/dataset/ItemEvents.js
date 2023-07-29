Ext.define('Ext.chart.plugin.ItemEvents', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.chartitemevents',

    /**
     * @cfg {Boolean} [moveEvents=false]
     * If `itemmousemove`, `itemmouseover` or `itemmouseout` event listeners are attached
     * to the chart, the plugin will detect those and will hit test series items on
     * every move. However, if the above item events are attached on the series level
     * only, this config has to be set to true, as the plugin won't perform a similar
     * detection on every series.
     */
    moveEvents: false,

    mouseMoveEvents: {
        mousemove: true,
        mouseover: true,
        mouseout: true
    },

    itemMouseMoveEvents: {
        itemmousemove: true,
        itemmouseover: true,
        itemmouseout: true
    },

    init: function (chart) {
        var handleEvent = 'handleEvent';

        this.chart = chart;

        chart.addElementListener({
            click: handleEvent,
            dblclick: handleEvent,
            mousedown: handleEvent,
            mousemove: handleEvent,
            mouseup: handleEvent,
            mouseover: handleEvent,
            mouseout: handleEvent,
            // run our handlers before user code
            priority: 1001,
            scope: this
        });
    },

    hasItemMouseMoveListeners: function () {
        var listeners = this.chart.hasListeners,
            name;
        for (name in this.itemMouseMoveEvents) {
            if (name in listeners) {
                return true;
            }
        }
        return false;
    },

    handleEvent: function (e) {
        var me = this,
            chart = me.chart,
            isMouseMoveEvent = e.type in me.mouseMoveEvents,
            lastItem = me.lastItem,
            chartXY, item;

        if (isMouseMoveEvent && !me.hasItemMouseMoveListeners() && !me.moveEvents) {
            return;
        }

        chartXY = chart.getEventXY(e);
        item = chart.getItemForPoint(chartXY[0], chartXY[1]);

        if (isMouseMoveEvent && !Ext.Object.equals(item, lastItem)) {
            if (item) {
                chart.fireEvent('itemmouseover', chart, item, e);
                item.series.fireEvent('itemmouseover', item.series, item, e);
            }
            if (lastItem) {
                chart.fireEvent('itemmouseout', chart, lastItem, e);
                lastItem.series.fireEvent('itemmouseout', lastItem.series, lastItem, e);
            }
        }

        if (item) {
            chart.fireEvent('item' + e.type, chart, item, e);
            item.series.fireEvent('item' + e.type, item.series, item, e);
        }

        me.lastItem = item;
    }
});