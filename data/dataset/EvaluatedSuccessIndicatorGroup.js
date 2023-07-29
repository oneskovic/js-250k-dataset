Ext.define('Ssp.view.tools.profile.EvaluatedSuccessIndicatorGroup', {
    extend: 'Ext.Container',
    alias: 'widget.evaluatedsuccessindicatorgroup',
    width: '100%',
    height: '100%',

    initComponent: function(){
        var me = this;
        Ext.apply(me, {
            layout: 'column',
            margin: 0,
            defaults: {
                columnWidth: 0.5,
                layout: {
                    type: 'anchor',
                    flex: 1
                },
                defaults: {
                    anchor: '100%'
                },
                flex: 1,
                border: 0,
                style: {
                    borderStyle: 'solid'
                }
            }
        });

        return me.callParent(arguments);
    }

});
