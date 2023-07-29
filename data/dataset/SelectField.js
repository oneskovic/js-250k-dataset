/**
 * The SelectField is a minor extension to te LookupField in that it explicitly hides search and actions.
 *
 * It may also optionally pass the `data` option which a view may optionally use instead of requesting data.
 *
 * ###Example:
 *     {
 *         name: 'State',
 *         property: 'State',
 *         label: this.stateText,
 *         type: 'select',
 *         view: 'state_list'
 *     }
 *
 * @alternateClassName SelectField
 * @extends LookupField
 */define('argos/Fields/SelectField', [
    'dojo/_base/declare',
    './LookupField'
], function(
    declare,
    LookupField
) {
    return declare('argos.Fields.SelectField', [LookupField], {
        /**
         * @cfg {Boolean}
         * Overrides the {@link LookupField LookupField} default to explicitly set it to false forcing
         * the view to use the currentValue instead of a key/descriptor
         */
        valueKeyProperty: false,

        /**
         * @cfg {Boolean}
         * Overrides the {@link LookupField LookupField} default to explicitly set it to false forcing
         * the view to use the currentValue instead of a key/descriptor
         */
        valueTextProperty: false,

        /**
         * @cfg {Object/Object[]/Function}
         * Required. If set as a function will be expanded.
         * Passed in the navigation options to the lookup view
         */
        data: null,

        /**
         * Overides the {@link LookupField#createNavigationOptions parent implementation} to set search and actions to
         * hidden and pass `data` defined on the field.
         */
        createNavigationOptions: function() {
            var options = this.inherited(arguments);
            options.hideSearch = true;
            options.data = this.expandExpression(this.data);
            return options;
        }        
    });
});