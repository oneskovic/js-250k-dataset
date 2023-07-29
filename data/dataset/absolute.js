Ext.define('Ext.layout.container.Absolute', {

    /* Begin Definitions */

    alias: 'layout.absolute',
    extend: 'Ext.layout.container.Anchor',
    alternateClassName: 'Ext.layout.AbsoluteLayout',

    /* End Definitions */

    itemCls: Ext.baseCSSPrefix + 'abs-layout-item',

    type: 'absolute',

    onLayout: function() {
        var me = this,
            target = me.getTarget(),
            targetIsBody = target.dom === document.body;

        // Do not set position: relative; when the absolute layout target is the body
        if (!targetIsBody) {
            target.position();
        }
        me.paddingLeft = target.getPadding('l');
        me.paddingTop = target.getPadding('t');
        me.callParent(arguments);
    },

    // private
    adjustWidthAnchor: function(value, comp) {
        //return value ? value - comp.getPosition(true)[0] + this.paddingLeft: value;
        return value ? value - comp.getPosition(true)[0] : value;
    },

    // private
    adjustHeightAnchor: function(value, comp) {
        //return value ? value - comp.getPosition(true)[1] + this.paddingTop: value;
        return value ? value - comp.getPosition(true)[1] : value;
    }
});
