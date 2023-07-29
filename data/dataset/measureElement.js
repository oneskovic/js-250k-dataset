define(['backbone', 'underscore', '../element'],
function (Backbone, _, Element) {
    'use strict';

    
    var MeasureElement = Element.extend({

        /**
         * Initialise connection for aggregation data
         */
        initConnections: function() {
            if (this._connection) {
                return;
            }

            // Get connection model
            this._connection = this.dataset.pool.getConnection({
                type: 'observations',
                measure: _.isNull(this.get('measure')) ? null : this.get('measure').id,
                aggregation: this.get('aggregation')
            });

            // Bind to sync event
            this.listenTo(this._connection, 'connection:sync', this._onSync);
        },

        getConnections: function () {
            if (_.isUndefined(this._connection)) {
                return [];
            }
            return [this.connection];
        },

        removeConnections: function () {
            if (this._connection) {
                this.dataset.pool.releaseConnection(this._connection);
                delete this._connection;
            }
        },

        /**
         * Handle connection sync event
         */
        _onSync: function() {
            this.ready();
        },

        /**
         * Check if connection data is loaded
         */
        isLoaded: function() {
            if (this._connection) {
                return this._connection.isLoaded();
            }
            return false;
        },

        /**
         * Get observations connection
         */
        _getConnection: function() {
            return this._connection;
        }

    });

    return MeasureElement;

});
