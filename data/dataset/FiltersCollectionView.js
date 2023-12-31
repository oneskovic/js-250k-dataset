(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('collectionViews/FiltersCollectionView', ['collectionViews/ProtoCollectionView', 'views/FilterView', 'underscore'], function(ProtoView, FilterView, _) {
    var FiltersCollectionView, _ref;

    FiltersCollectionView = (function(_super) {
      __extends(FiltersCollectionView, _super);

      function FiltersCollectionView() {
        _ref = FiltersCollectionView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      FiltersCollectionView.prototype.itemView = FilterView;

      FiltersCollectionView.prototype.template = '#filters-collection-view-template';

      FiltersCollectionView.prototype.events = {
        'click #js-left': 'left',
        'click #js-right': 'right'
      };

      FiltersCollectionView.prototype.initialize = function(o) {
        this.o = o != null ? o : {};
        FiltersCollectionView.__super__.initialize.apply(this, arguments);
        return this;
      };

      FiltersCollectionView.prototype.render = function() {
        FiltersCollectionView.__super__.render.apply(this, arguments);
        this.$container = this.$('#js-filters-place');
        this.$leftButton = this.$('#js-left');
        this.$rightButton = this.$('#js-right');
        this.$el.on('show', _.bind(this.detectArrows, this));
        App.$window.on('resize', _.bind(this.detectArrows, this));
        return this;
      };

      FiltersCollectionView.prototype.left = function() {
        return this.animateScroll(-200);
      };

      FiltersCollectionView.prototype.right = function() {
        return this.animateScroll(200);
      };

      FiltersCollectionView.prototype.animateScroll = function(amount) {
        var scrollLeft,
          _this = this;

        scrollLeft = this.$container.scrollLeft();
        return this.$container.animate({
          'scrollLeft': this.$container.scrollLeft() + amount
        }, function() {
          return _this.detectArrows();
        });
      };

      FiltersCollectionView.prototype.detectArrows = function() {
        this.$leftButton.toggle(!(this.$container.scrollLeft() === 0));
        return this.$rightButton.toggle(this.$container.scrollLeft() + this.$container.outerWidth() < this.$container[0].scrollWidth);
      };

      FiltersCollectionView.prototype.appendHtml = function(collectionView, itemView, i) {
        return this.$('#js-filters-place').append(itemView.el);
      };

      return FiltersCollectionView;

    })(ProtoView);
    return FiltersCollectionView;
  });

}).call(this);
