Ext.define('Ssp.view.tools.profile.EvaluatedSuccessIndicator', {
    extend: 'Ext.Container',
    alias: 'widget.evaluatedsuccessindicator',
    width: '100%',
    height: '100%',
    
    initComponent: function(){
        var me = this;

        var tpl = new Ext.XTemplate('<tpl for=".">' +
                '<div class="wrapper">' +
                    '<div class="success-indicator {[this.indicatorCls(values)]}">' +
                        '<h3 class="title" data-qtip="{indicatorName:htmlEncode}<tpl if="this.isNotEmpty(indicatorDescription)">: {indicatorDescription:htmlEncode}</tpl>">{indicatorName:htmlEncode}</h3>' +
                        '<p class="value" data-qtip="{indicatorValue:htmlEncode}<tpl if="this.isNotEmpty(indicatorValueDescription)">: {indicatorValueDescription:htmlEncode}</tpl>">{indicatorValue:htmlEncode}</p>' +
                        '<p class="rating"><i class="fa {[this.iconCls(values)]}" ></i>{indicatorEvaluationDisplayName:htmlEncode}</p>' +
                    '</div>' +
            '</tpl>', {
                normalizeEval: function(indicator) {
                    return indicator.indicatorEvaluation == null ? '' : indicator.indicatorEvaluation.toString().toLowerCase();
                },
                indicatorCls: function(indicator) {
                    return this.normalizeEval(indicator);
                },
                iconCls: function(indicator) {
                    switch (this.normalizeEval(indicator)) {
                        case "high":
                            return 'fa-check-circle';
                        case "medium":
                            return 'fa-minus-circle';
                        case "low":
                            return 'fa-times-circle';
                        default:
                            return 'fa-ban';
                    }
                },
                isNotEmpty: function(value) {
                    return !(Ext.isEmpty(value));
                }
        });

        
        Ext.apply(me, {
            layout: 'anchor',
            padding: '2 2 2 2',
            defaults: {
                anchor: '100%'
            },
            tpl: tpl
        });
        
        return me.callParent(arguments);
    }
});
