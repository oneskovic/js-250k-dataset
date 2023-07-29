define(function(require) {
  var api = require('util/api');
  var CollectionBase = require('models/CollectionBase');
  var MetadataSearchResult = require('models/MetadataSearchResult');

  var MetadataSearch = CollectionBase.extend({
    model: MetadataSearchResult,

    constructor: function() {
      CollectionBase.call(this);
    },

    url: function() {
      return api.url('search');
    },

    doSearch: function(query, callback) {
      if (query.q) {
        query = _.extend({type: 'metadata', max: 5}, query);
        this.fetch({data: query, success: callback});
      }
    },

    parse: function(resp, xhr) {
      if (typeof(resp) === 'object' && resp.rsm && resp.items) {
        this.index = resp.rsm.index;
        this.count = resp.rsm.count;
        return resp.items;
      } else {
        return resp;
      }
    }
  });

  return MetadataSearch;
});
