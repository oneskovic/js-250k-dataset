(function() {
  var _this = this,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('collections/IconsCollection', ['backbone', 'models/IconModel', 'underscore', 'helpers'], function(B, IconModel, _, helpers) {
    var IconsCollection, _ref;

    IconsCollection = (function(_super) {
      __extends(IconsCollection, _super);

      function IconsCollection() {
        _ref = IconsCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      IconsCollection.prototype.model = IconModel;

      IconsCollection.prototype.initialize = function(o) {
        this.o = o != null ? o : {};
        this.listenToPUBSUB();
        IconsCollection.__super__.initialize.apply(this, arguments);
        return this;
      };

      IconsCollection.prototype.listenToPUBSUB = function() {
        var _this = this;

        return App.vent.on('icon-select-filter:change', function(filter) {
          var iconsFiltered, pattern;

          pattern = new RegExp(filter, 'gi');
          iconsFiltered = 0;
          _this.each(function(model) {
            var isFiltered;

            isFiltered = !(model.get('name').match(pattern)) ? true : false;
            model.set('isFiltered', isFiltered);
            return isFiltered && iconsFiltered++;
          });
          _this.filtered = iconsFiltered === _this.length;
          return _this.onFilter(_this.filtered);
        });
      };

      IconsCollection.prototype.selectAll = function() {
        this.setToAll(true);
        return this.selectedCnt = this.length;
      };

      IconsCollection.prototype.deSelectAll = function() {
        this.setToAll(false);
        return this.selectedCnt = 0;
      };

      IconsCollection.prototype.setToAll = function(val) {
        var _this = this;

        this.each(function(model) {
          var hash, sectionName;

          if (!model.get('isFiltered')) {
            model.set('isSelected', val);
            hash = model.get('hash');
            sectionName = _this.parentModel.get('name');
            if (!val) {
              return App.iconsSelected = _.without(App.iconsSelected, "" + sectionName + ":" + hash);
            } else {
              return App.iconsSelected.push("" + sectionName + ":" + hash);
            }
          }
        });
        return App.iconsSelected = _.uniq(App.iconsSelected);
      };

      return IconsCollection;

    })(B.Collection);
    return IconsCollection;
  });

}).call(this);
