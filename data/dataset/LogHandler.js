/**
 * Warning handler that logs all warnings to a console
 *
 * @param  {Object}  console  console with a warn or log method
 */
function LogHandler( console )
{
    if ( !( this instanceof LogHandler ) )
    {
        return new LogHandler( console );
    }

    this._console = console || {};
}


LogHandler.prototype = {
    /**
     * Handle a warning
     *
     * Will attempt to log using console.warn(), falling back to
     * console.log() if necessary and aborting entirely if neither is
     * available.
     *
     * This is useful as a default option to bring problems to the
     * developer's attention without affecting the control flow of the
     * software.
     *
     * @param   {Warning}   warning  warning to handle
     * @return  {undefined}
     */
    handle: function( warning )
    {
        var dest = this._console.warn || this._console.log;
        dest && dest.call( this._console,
            'Warning: ' + warning.message
        );
    },
}

module.exports = LogHandler;

