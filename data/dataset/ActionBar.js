define('argos/ActionBar', [
    'dojo/_base/declare',
    'dojo/dom-attr',
    'dojo/dom-class',
    'dojo/string',
    './Toolbar'
], function(
    declare,
    domAttr,
    domClass,
    string,
    Toolbar
) {

    return declare('argos.ActionBar', [Toolbar], {
        /**
         * @property {String}
         * The base CSS classes added to the main dom node.
         */
        baseClass: 'toolbar action-toolbar',
        /**
         * @cfg {String}
         * Used to determine toolbar styling, settable via `this.set('position', 'value')` and fires
         * {@link Toolbar#onPositionChange onPositionChange}.
         */
        position: 'action',
        /**
         * Extends the {@link Toolbar#_create parent implementation} to default an items `place` attribute
         * to `'right'` if not defined.
         * @param {Object} props Properties collection of the toolbar item being created.
         * @return {Object} New toolbar item instance
         */
        _create: function(props) {
            props.place = props.place || 'right';

            return this.inherited(arguments, [props]);
        },
        /**
         * Extends the {@link Toolbar#_place parent implementation} to add a CSS class based on the `place` attribute
         * @param {Object} item Toolbar item being placed.
         */
        _place: function(item) {
            domClass.add(item.domNode, 'on-' + item.get('place'));

            this.inherited(arguments);
        },
        /**
         * Override to be able to return the proper parent context in the case of ActionBar being within
         * a scroll container or view.
         * @return Context
         */
        _getContextAttr: function() {
            if (this.context) return this.context;
            return this.getComponentRoot();
        }
    });
});
