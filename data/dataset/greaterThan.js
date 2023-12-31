(function($) {

    $.fn.bootstrapValidator.i18n.greaterThan = $.extend($.fn.bootstrapValidator.i18n.greaterThan || {}, {

        'default': 'Please enter a value greater than or equal to %s',

        notInclusive: 'Please enter a value greater than %s'

    });



    $.fn.bootstrapValidator.validators.greaterThan = {

        html5Attributes: {

            message: 'message',

            value: 'value',

            inclusive: 'inclusive'

        },



        enableByHtml5: function($field) {

            var min = $field.attr('min');

            if (min) {

                return {

                    value: min

                };

            }



            return false;

        },



        

        validate: function(validator, $field, options) {

            var value = $field.val();

            if (value === '') {

                return true;

            }



            var compareTo = $.isNumeric(options.value) ? options.value : validator.getDynamicOption($field, options.value);



            value = parseFloat(value);

			return (options.inclusive === true || options.inclusive === undefined)

                    ? {

                        valid: value >= compareTo,

                        message: $.fn.bootstrapValidator.helpers.format(options.message || $.fn.bootstrapValidator.i18n.greaterThan['default'], compareTo)

                    }

                    : {

                        valid: value > compareTo,

                        message: $.fn.bootstrapValidator.helpers.format(options.message || $.fn.bootstrapValidator.i18n.greaterThan.notInclusive, compareTo)

                    };

        }

    };

}(window.jQuery));

