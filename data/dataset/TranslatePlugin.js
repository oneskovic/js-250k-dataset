/**
 * This is the plugin for translating documents
 */

Ext.define('LIME.ux.TranslatePlugin', {
    singleton : true,
    alternateClassName : 'TranslatePlugin',

    beforeTranslate : function(params) {
        var dom = params.docDom;
        Ext.each(dom.querySelectorAll('[style]'), function(node) {
            var align = node.getAttribute('style').match(/text-align:\s*(\w+);/);
            if ( align && align[1] ) {
                node.setAttribute(Language.attributePrefix+'class', align[1]);
            }
        });
        return params;
    },

    afterTranslate : function(params) {
    }
});
