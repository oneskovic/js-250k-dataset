(function($) {

    $.fn.bootstrapValidator.i18n.imei = $.extend($.fn.bootstrapValidator.i18n.imei || {}, {

        'default': 'Please enter a valid IMEI number'

    });



    $.fn.bootstrapValidator.validators.imei = {

        

        validate: function(validator, $field, options) {

            var value = $field.val();

            if (value === '') {

                return true;

            }



            switch (true) {

                case /^\d{15}$/.test(value):

                case /^\d{2}-\d{6}-\d{6}-\d{1}$/.test(value):

                case /^\d{2}\s\d{6}\s\d{6}\s\d{1}$/.test(value):

                    value = value.replace(/[^0-9]/g, '');

                    return $.fn.bootstrapValidator.helpers.luhn(value);



                case /^\d{14}$/.test(value):

                case /^\d{16}$/.test(value):

                case /^\d{2}-\d{6}-\d{6}(|-\d{2})$/.test(value):

                case /^\d{2}\s\d{6}\s\d{6}(|\s\d{2})$/.test(value):

                    return true;



                default:

                    return false;

            }

        }

    };

}(window.jQuery));

