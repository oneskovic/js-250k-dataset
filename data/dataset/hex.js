(function($) {

    $.fn.bootstrapValidator.i18n.hex = $.extend($.fn.bootstrapValidator.i18n.hex || {}, {

        'default': 'Please enter a valid hexadecimal number'

    });



    $.fn.bootstrapValidator.validators.hex = {

        

        validate: function(validator, $field, options) {

            var value = $field.val();

            if (value === '') {

                return true;

            }



            return /^[0-9a-fA-F]+$/.test(value);

        }

    };

}(window.jQuery));

