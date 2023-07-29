/**
 * Repository query
 */
var RepositoryUrl = "api/repository";
var repoPathUrl = function() {
    /*
    return (Settings.BIPLUGIN5 ? "/repository"
                    : (Settings.BIPLUGIN ? "/pentahorepository2" : "/repository2"));
    */
    if (Settings.BIPLUGIN)
        return "pentaho/repository";

    return  RepositoryUrl;
};



var RepositoryObject = Backbone.Model.extend( {
    url: function( ) {
        var segment = repoPathUrl() + "/resource";
        return segment;
    }
} );

var RepositoryAclObject = Backbone.Model.extend( {
    url: function( ) {
        var segment = repoPathUrl() + "/resource/acl";
        return segment;
    },
    parse: function(response) {
        if (response != "OK") {
            _.extend(this.attributes, response);
        }
    }
} );

var RepositoryZipExport = Backbone.Model.extend( {
    url: function( ) {
        var segment = repoPathUrl() + "/zip";
        return segment;
    }
} );

var SavedQuery = Backbone.Model.extend({

    parse: function(response) {
        //console.log("response: " + response);
        //this.xml = response;
    },

    url: function() {
        var u = repoPathUrl() + "/resource";
        return u;

    },

    move_query_to_workspace: function(model, response) {
        var file = response;
        var filename = model.get('file');
        for (var key in Settings) {
            if (key.match("^PARAM")=="PARAM") {
                var variable = key.substring("PARAM".length, key.length);
                var Re = new RegExp("\\$\\{" + variable + "\\}","g");
                var Re2 = new RegExp("\\$\\{" + variable.toLowerCase() + "\\}","g");
                file = file.replace(Re,Settings[key]);
                file = file.replace(Re2,Settings[key]);

            }
        }
        var query = new Query({
            xml: file,
            formatter: Settings.CELLSET_FORMATTER
        },{
            name: filename
        });

        var tab = Saiku.tabs.add(new Workspace({ query: query }));
    }
});

/**
 * Repository adapter
 */
var Repository = Backbone.Collection.extend({
    model: SavedQuery,
	file: null,
    initialize: function(args, options) {
        if (options && options.dialog) {
            this.dialog = options.dialog;
        }
    },

    parse: function(response) {
        if (this.dialog) {
            this.dialog.populate(response);
        }
		return response;
    },

	url: function() {
		var segment = repoPathUrl() + "?type=saiku";
		if (Settings.REPO_BASE && !this.file) {
			segment += "&path=" + Settings.REPO_BASE;
		}
		return segment;
	}
});
