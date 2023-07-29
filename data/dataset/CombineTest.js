require( 'common' ).testCase(
{
    caseSetUp: function()
    {
        // this is why we require node.js
        this.fs = require( 'fs' );
        this.vm = require( 'vm' );

        this.files = [ 'ease.js', 'ease-full.js' ];
    },


    setUp: function()
    {
        // sandbox in which combined script will be run
        this.sandbox = {
            // stub document.write() so we don't blow up
            document: { write: function() {} },
        };
    },


    /**
     * Each combined file contains all of the test cases. To ensure their
     * integrity, run them all in each file.
     */
    '@each(files) Tests pass in combined file': function( file )
    {
        var _self = this;

        // attempt to read the combined file
        try
        {
            var data = this.fs.readFileSync(
                ( __dirname + '/../build/' + file ),
                'ascii'
            );
        }
        catch ( e )
        {
            // if the file doesn't exit, just skip the test
            this.skip();
        }

        // run the script (if this fails to compile, the generated code is
        // invalid)
        this.vm.runInNewContext( data, this.sandbox );

        this.assertEqual(
            this.sandbox.require,
            undefined,
            "require() function is not in the global scope"
        );

        this.assertEqual(
            this.sandbox.exports,
            undefined,
            "exports are not in the global scope"
        );

        this.assertOk(
            ( this.sandbox.easejs !== undefined ),
            "'easejs' namespace is defined within combined file"
        );

        [
            'Class',
            'AbstractClass',
            'FinalClass',
            'Interface',
            'Trait',
            'version'
        ] .forEach( function( item )
        {
            _self.assertOk(
                _self.sandbox.easejs[ item ],
                "Combined file exports exposes " + item
            );
        } );

        // the full file has tests included to be run client-side
        if ( file.match( /ease-full/ ) )
        {
            this.assertOk(
                ( typeof this.sandbox.easejs.runTests === 'function' ),
                "Full ease.js file contains test runner"
            );

            // cross your fingers
            this.sandbox.easejs.runTests();
        }
    },
} );
