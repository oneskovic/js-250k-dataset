
var $_runtimeThis = function($name, $private, $filter, $function, $arguments)
{
    // If a constraint filter was provided
    if ($filter)
    {
        // If the function is an accessor method, return the constrained context wrapper get accessor
        if ($arguments == 0)
            return function()
            {
                // Call the function in the context of a private instance and return the return value (within the applied constraint filter)
                return $filter($function.call($private), $name);
            };

        // If the function is a mutator method, return the constrained context wrapper set accessor
        if ($arguments == 1)
            return function($v)
            {
                // Call the function in the context of a private instance with the accessor value (within the applied constraint filter) and return the return value
                return $function.call($private, $filter($v, $name));
            };

        // Return the constrained context wrapper function
        return function()
        {
            // Apply the function in the context of a private instance with the provided arguments and return the return value (within the applied constraint filter)
            return $filter($function.apply($private, arguments), $name);
        };
    }

    // If the function is an accessor method, return the context wrapper get accessor
    if ($arguments == 0)
        return function()
        {
            // Call the function in the context of a private instance and return the return value
            return $function.call($private);
        };

    // If the function is a mutator method, return the context wrapper set accessor
    if ($arguments == 1)
        return function($v)
        {
            // Call the function in the context of a private instance with the accessor value and return the return value
            return $function.call($private, $v);
        };

    // Return the context wrapper function
    return function()
    {
        // Apply the function in the context of a private instance with the provided arguments and return the return value
        return $function.apply($private, arguments);
    };
};