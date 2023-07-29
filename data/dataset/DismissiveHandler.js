/**
 * Warning handler that dismisses (ignores) all warnings
 *
 * This is useful in a production environment.
 */
function DismissiveHandler()
{
    if ( !( this instanceof DismissiveHandler ) )
    {
        return new DismissiveHandler();
    }
}


DismissiveHandler.prototype = {
    /**
     * Handle a warning
     *
     * @param   {Warning}   warning  warning to handle
     * @return  {undefined}
     */
    handle: function( warning )
    {
        // intentionally do nothing
    },
}

module.exports = DismissiveHandler;

