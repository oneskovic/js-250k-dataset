/**
 * Model which handles "special" actions against the query
 * Ex.: selections, swap axis, mdx
 */
var QueryAction = Backbone.Model.extend({
    initialize: function(args, options) {
        // Keep track of query
        this.query = options.query;

        // Set default url
        this.url = this.query.url;
    },

    gett: function(action, options) {
        this.handle("fetch", action, options);
    },

    post: function(action, options) {
        this.handle("save", action, options);
    },

    put: function(action, options) {
        this.id = _.uniqueId('queryaction_');
        this.handle("save", action, options);
        delete this.id;
    },

    del: function(action, options) {
        this.id = _.uniqueId('queryaction_');
        this.handle("delete", action, options);
        delete this.id;
    },

    // Call arbitrary actions against the query
    handle: function(method, action, options) {
        // Set query action
        this.url = this.query.url() + action;

		var id = this.id;
        // Clear out old attributes
        this.attributes = options.data? options.data : {};

        // Initiate action
        if (method == "save") {
            // Handle response from server
            //this.parse = options.success;

            this.save({}, options);
        } else if (method == "delete") {
			this.set("id", this.id);
            this.destroy(options);
        } else if (method == "fetch") {
            this.parse = function() {};
            this.fetch(options);
        }
    }
});
