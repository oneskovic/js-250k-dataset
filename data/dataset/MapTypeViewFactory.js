/**
 * Override for breaking change in v1.0.0RC1: http://www.elasticsearch.org/guide/en/elasticsearch/reference/master/_indices_apis.html
 * @constructor
 *
 * {
   "comicbook": {
      "mappings": {
         "male": {
            "properties": {
               "name": {
                  "type": "string",
                  "store": true
               }
            }
         },
         "superhero": {
            "properties": {
               "name": {
                  "type": "string"
               },
               "summary": {
                  "type": "string"
               }
            }
         }
      }
   }
}
 */
function MapTypeViewFactory() {
    this.create = function (model) {
        if (versionUtil.isNewer("0.99.0", cluster.versionNumber.concat)) {
            var mapTypeView = new MapTypeView({model:model});
            mapTypeView.render = function () {
                var _mapping = this.model.model.toJSON();

                var mapType = {};

                mapType.indexId = _mapping.indexId;
                mapType.mappingName = _mapping.mappingName;
                var props = _mapping[_mapping.indexId].mappings[_mapping.mappingName].properties;
                var template = _.template(mappingTemplate.mapView, {props:props, mapType:mapType});
                $('#workspace').html(template);
                $("[rel=popRight]").popover();
            };
            return mapTypeView;
        }
        else {
            return new MapTypeView({model:model});
        }
    }
}