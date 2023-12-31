(function() {
  define(function(require, exports, module) {
    var StatsManager, UnionCollection;
    UnionCollection = (function() {
      function UnionCollection(opt) {
        if (opt.equal) {
          this.equal = opt.equal;
        }
        if (opt.combine) {
          this.combine = opt.combine;
        }
        if (opt.subtract) {
          this.subtract = opt.substract;
        }
        if (opt.reset) {
          this.reset = opt.reset;
        }
        this.children = {};
        this.items = [];
      }

      UnionCollection.prototype.setItems = function(uid, items) {
        var eq, item, parent, _i, _len;
        if (this.children[uid]) {
          this.removeItems(uid);
        }
        eq = this.equal;
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          parent = _.find(this.items, function(i) {
            return eq(i, item);
          });
          if (parent) {
            this.combine(parent, item);
            item.parent = parent;
          } else {
            this.items.push(item);
          }
        }
        return this.children[uid] = items;
      };

      UnionCollection.prototype.removeItems = function(uid) {
        var i, items, _results;
        items = this.children[uid];
        i = items.length;
        _results = [];
        while (--i >= 0) {
          if (items[i].parent) {
            _results.push(this.subtract(items[i].parent, items[i]));
          } else {
            _results.push(this.reset(items[i]));
          }
        }
        return _results;
      };

      UnionCollection.prototype.combine = function(c, c1) {
        c.count += c1.count;
        return c;
      };

      UnionCollection.prototype.subtract = function(c, c1) {
        c.count -= c1.count;
        return c;
      };

      UnionCollection.prototype.reset = function(c) {
        return c.count = 0;
      };

      return UnionCollection;

    })();
    StatsManager = (function() {
      function StatsManager() {
        this.colors = new UnionCollection({
          equal: function(c1, c2) {
            return _.isEqual(c1.rgb, c2.rgb);
          },
          combine: function(c, c1) {
            if (!c.hex) {
              c.hex = c1.hex;
            }
            return c.count += c1.count;
          }
        });
        this.fonts = new UnionCollection({
          equal: function(c1, c2) {
            return c1.name === c2.name;
          }
        });
      }

      StatsManager.prototype.addStats = function(url, stats) {
        this.colors.setItems(url, stats.colors);
        return this.fonts.setItems(url, stats.fonts);
      };

      return StatsManager;

    })();
    return module.exports = new StatsManager();
  });

}).call(this);
