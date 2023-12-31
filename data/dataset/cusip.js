(function($) {

    $.fn.bootstrapValidator.i18n.cusip = $.extend($.fn.bootstrapValidator.i18n.cusip || {}, {

        'default': 'Please enter a valid CUSIP number'

    });



    $.fn.bootstrapValidator.validators.cusip = {

        

        validate: function(validator, $field, options) {

            var value = $field.val();

            if (value === '') {

                return true;

            }



            value = value.toUpperCase();

            if (!/^[0-9A-Z]{9}$/.test(value)) {

                return false;

            }



            var converted = $.map(value.split(''), function(item) {

                                var code = item.charCodeAt(0);

                                return (code >= 'A'.charCodeAt(0) && code <= 'Z'.charCodeAt(0))

                                            // Replace A, B, C, ..., Z with 10, 11, ..., 35

                                            ? (code - 'A'.charCodeAt(0) + 10)

                                            : item;

                            }),

                length    = converted.length,

                sum       = 0;

            for (var i = 0; i < length - 1; i++) {

                var num = parseInt(converted[i], 10);

                if (i % 2 !== 0) {

                    num *= 2;

                }

                if (num > 9) {

                    num -= 9;

                }

                sum += num;

            }



            sum = (10 - (sum % 10)) % 10;

            return sum === converted[length - 1];

        }

    };

}(window.jQuery));

