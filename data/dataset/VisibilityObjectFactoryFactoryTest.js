require( 'common' ).testCase(
{
    caseSetUp: function()
    {
        this.sut = this.require( 'VisibilityObjectFactoryFactory' );

        this.VisibilityObjectFactory =
            this.require( 'VisibilityObjectFactory' );

        this.FallbackVisibilityObjectFactory =
            this.require( 'FallbackVisibilityObjectFactory' );

        this.util = this.require( 'util' );
    },


    /**
     * By default, if supported by our environment, we should use the standard
     * factory to provide proper visibility support.
     */
    'Returns standard factory if not falling back': function()
    {
        // don't bother with the test if we don't support the standard visibility
        // object
        if ( this.util.definePropertyFallback() )
        {
            return;
        }

        this.assertOk(
            ( this.sut.fromEnvironment()
                instanceof this.VisibilityObjectFactory ),
            "Creates standard VisibilityObjectFactory if supported"
        );
    },


    /**
     * If not supported by our environment, we should be permitted to fall back to a
     * working implementation that sacrifices visibility support.
     */
    'Returns fallback factory if falling back': function()
    {
        var old = this.util.definePropertyFallback();

        // force fallback
        this.util.definePropertyFallback( true );

        this.assertOk(
            ( this.sut.fromEnvironment()
                instanceof this.FallbackVisibilityObjectFactory
            ),
            "Creates fallback VisibilityObjectFactory if falling back"
        );

        // restore fallback
        this.util.definePropertyFallback( old );
    },
} );
