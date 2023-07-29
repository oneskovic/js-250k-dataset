/**
 *
 * The ValueOnlyField is a simple storage mechanism for values you wish to store, pass, use, manipulate
 * without having to display it.
 *
 * Whereas {@link HiddenField HiddenField} actually sets the value to an
 * input field (meaning string only) ValueOnly keeps the given value, no matter the type in memory.
 *
 * ###Example:
 *     {
 *         name: 'HistorySECCode',
 *         property: 'HistorySECCode',
 *         type: 'valueOnly'
 *     }
 *
 * @alternateClassName ValueOnlyField
 * @extends _Field
 */
define('argos/Fields/ValueOnlyField', [
    'dojo/_base/declare',
    './_Field'
], function(
    declare,
    _Field
) {
    /* todo: figure out a way to not do any rendering for this field. */
    return declare('argos.Fields.ValueOnlyField', [_Field], {
        /**
         * @property {Simplate}
         * Simplate that defines the rows (field containers) HTML Markup.
         *
         * * `$` => Field instance
         * * `$$` => Owner View instance
         *
         */
        rowTemplate: new Simplate([
            '<div style="display: none;" data-field="{%= $.name || $.property %}" data-field-type="{%= $.type %}">',
            '</div>'
        ]),

        /**
         * @property {Simplate}
         * Simplate that defines the fields HTML Markup.
         *
         * * `$` => Field instance
         * * `$$` => Owner View instance
         *
         */
        widgetTemplate: new Simplate([
            '<input data-dojo-attach-point="inputNode" type="hidden">'
        ]),

        /**
         * @property {Object/String/Number/Boolean}
         * The value being stored.
         */
        currentValue: null,

        /**
         * Merely returns the stored value from memory.
         * @return {Object/String/Number/Boolean}
         */
        getValue: function() {
            return this.currentValue;
        },

        /**
         * Sets the value in memory
         * @param {Object/String/Number/Boolean} val Value to be stored.
         */
        setValue: function(val) {
            this.currentValue = val;
        },

        /**
         * Clears the value by setting the `currentValue` to null.
         */
        clearValue: function() {
            this.setValue(null);
        }
    });
});