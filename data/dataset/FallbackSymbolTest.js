require( 'common' ).testCase(
{
    caseSetUp: function()
    {
        this.Sut = this.require( 'util/symbol/FallbackSymbol' );
    },


    /**
     * Symbols are used to create an object fields that is accessible only
     * to the holder of a reference to the symbol used to create that field.
     * Since this fallback is intended to be used in environments that do
     * not support symbols, the alternative is to return a random string
     * that is highly unlikely to exist in practice. However, we must also
     * return an object to allow for instanceof checks. See below test for
     * more details.
     */
    'Constructor returns an instance of Symbol': function()
    {
        var result = this.Sut();
        this.assertOk( result instanceof this.Sut );
    },


    /**
     * The generated string should be unique for each call, making it
     * unlikely that its value can be guessed. Of course, this relies on the
     * assumption that the runtime's PRNG is reliable and that it has not
     * been maliciously rewritten.
     *
     * Note that we don't test the various implementation details, as that
     * is intended to be opaque (see SUT source for details).
     */
    'Generated string varies with each call': function()
    {
        var gen = {},
            i   = 32;

        while ( i-- )
        {
            var result = this.Sut();
            if ( gen[ result ] )
            {
                this.fail( result, '' );
            }

            gen[ result ] = true;
        }

        // this prevents the test from being marked as incomplete
        this.assertOk( 'passed' );
    },
} );

