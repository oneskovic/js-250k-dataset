  
  ejs.GeoHashGridAggregation = function (name) {

    var
      _common = ejs.AggregationMixin(name),
      agg = _common.toJSON();

    agg[name].geohash_grid = {};

    return extend(_common, {

      /**
      Sets the geo field to perform calculations from.

      @member ejs.GeoHashGridAggregation
      @param {String} field a valid field name.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      field: function (field) {
        if (field == null) {
          return agg[name].geohash_grid.field;
        }

        agg[name].geohash_grid.field = field;
        return this;
      },

      /**
      Sets the Geo Hash precision.  The precision value can be between 1 and 12
      where 12 is the highest precision.

      @member ejs.GeoHashGridAggregation
      @param {Integer} p The precision.  Integer between 1 and 12.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      precision: function (p) {
        if (p == null) {
          return agg[name].geohash_grid.precision;
        }

        agg[name].geohash_grid.precision = p;
        return this;
      },

      /**
      Sets the number of aggregation entries that will be returned.

      @member ejs.GeoHashGridAggregation
      @param {Integer} size The numer of aggregation entries to be returned.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      size: function (size) {
        if (size == null) {
          return agg[name].geohash_grid.size;
        }

        agg[name].geohash_grid.size = size;
        return this;
      },


      /**
      Determines how many geohash_grid the coordinating node will request from
      each shard.

      @member ejs.GeoHashGridAggregation
      @param {Integer} shardSize The numer of geohash_grid to fetch from each shard.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      shardSize: function (shardSize) {
        if (shardSize == null) {
          return agg[name].geohash_grid.shard_size;
        }

        agg[name].geohash_grid.shard_size = shardSize;
        return this;
      }

    });
  };
