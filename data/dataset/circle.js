Physics.geometry('circle', function( parent ){

    var defaults = {

        radius: 1.0
    };

    return {

        // extended
        init: function( options ){

            var self = this;
            // call parent init method
            parent.init.call(this, options);

            this.options.defaults( defaults );
            this.options.onChange(function( opts ){
                this.radius = opts.radius;
            });
            this.options( options );

            this._aabb = Physics.aabb();
            this.radius = this.options.radius;
        },
                
        // extended
        aabb: function( angle ){

            var r = this.radius
                ;

            // circles are symetric... so angle has no effect
            if ( this._aabb.hw !== r ){
                // recalculate
                this._aabb = Physics.aabb( -r, -r, r, r );
            }

            return Physics.aabb.clone( this._aabb );
        },

        // extended
        getFarthestHullPoint: function( dir, result ){

            result = result || new Physics.vector();

            return result.clone( dir ).normalize().mult( this.radius );
        },

        // extended
        getFarthestCorePoint: function( dir, result, margin ){

            result = result || new Physics.vector();

            // we can use the center of the circle as the core object
            // because we can project a point to the hull in any direction
            // ... yay circles!
            // but since the caller is expecting a certain margin... give it
            // to them
            return result.clone( dir ).normalize().mult( this.radius - margin );
        }
    };
});
