
var $_runtimeFilterCustom = function($handle, $default, $suppress, $cast, $null)
{
    // ---------- INTEGER ----------
    if ($handle == 'integer' || $handle == 'int')
        return function($value, $name)
        {
            // If the value is not a primitive number
            if (typeof $value != 'number')
            {
                // If the value is not a number object
                if ($$_type($value) != 'number')
                {
                    // If the cast flag is set, return the value cast as an integer
                    if ($cast)
                        return $$_asInteger($value);

                    // If a name was provided, strict mode is enabled, and the suppress flag is not set when there is an invalid value, throw an exception
                    if ($name && $_strict && !$suppress && (!$null || $value !== null))
                        $_exceptionFormat($_lang_filter_value, $name, $handle);

                    // If the nullable flag is set, return null
                    if ($null)
                        return null;

                    // Return zero
                    return 0;
                }
                // Get the primitive value of the object
                else
                    $value = $__number_valueOf__.call($value);
            }

            // If the value is not-a-number, return zero
            if ($__isNaN($value))
                return 0;

            // If the value is greater than the maximum integer, return the maximum representable integer
            if ($value > $_const_int_max)
                return $_const_int_max;

            // If the value is less than the minimum integer, return the maximum representable integer
            if ($value < $_const_int_min)
                return $_const_int_min;

            // If the value is less than zero, return the value as an integer (rounded towards zero)
            if ($value < 0)
                return $__ceil($value);

            // Return the value as an integer (rounded towards zero)
            return $__floor($value);
        };
    // ---------- PRIMITIVE ----------
    else if ($handle == 'primitive')
        return function($value, $name)
        {
            // If the value is a primitive, return it
            if ($$_isPrimitive($value))
                return $value;

            // Get the value type
            var $type = $_types[$__toString__.call($value)] || 'object';

            // If the value is a boolean, return the primitive value of the boolean
            if ($type == 'boolean')
                return $__boolean_valueOf__.call($value);

            // If the value is a number, return the primitive value of the number
            if ($type == 'number')
                return $__number_valueOf__.call($value);

            // If the value is a string, return the primitive value of the string
            if ($type == 'string')
                return $__string_valueOf__.call($value);

            // If a name was provided, strict mode is enabled, and the suppress flag is not set, throw an exception
            if ($name && $_strict && !$suppress)
                $_exceptionFormat($_lang_filter_value, $name, $handle);

            return null;
        };
    // ---------- TYPED ARRAY ----------
    else if ($handle.length > 2 && $handle[$handle.length - 2] == '[' && $handle[$handle.length - 1] == ']' && $_constraints[$handle])
        return $_runtimeFilterInternal($handle, null, $suppress, '[object ' + $handle[0].toUpperCase() + $handle.substr(1, $handle.length - 3) + 'Array]');

    return null;
};