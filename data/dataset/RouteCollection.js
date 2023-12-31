(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.RouteCollection = (function(_super) {
    __extends(RouteCollection, _super);

    function RouteCollection() {
      this.createProductionVersion = __bind(this.createProductionVersion, this);
      this.getRouteCode = __bind(this.getRouteCode, this);
      this.findRouteForPath = __bind(this.findRouteForPath, this);
      this.comparator = __bind(this.comparator, this);
      this.initDefaultRoute = __bind(this.initDefaultRoute, this);
      this.initLocalStorage = __bind(this.initLocalStorage, this);
      _ref = RouteCollection.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    RouteCollection.prototype.model = Route;

    RouteCollection.prototype.initialize = function(options) {};

    RouteCollection.prototype.initLocalStorage = function(namespace) {
      this.localStorage = new Backbone.LocalStorage(namespace + "-RouteCollection");
      this.fetch();
      this.initDefaultRoute(true);
      return this.initDefaultRoute(false);
    };

    RouteCollection.prototype.initDefaultRoute = function(desiredVersion) {
      var existing, route,
        _this = this;
      existing = this.find(function(route) {
        return route.get("isProductionVersion") === desiredVersion && "/index".match(route.pathRegex) !== null;
      });
      if (existing) {
        return;
      }
      route = new Route({
        name: "default",
        routePath: "/index",
        errorMessage: "Note: Path has not yet been executed.",
        routeCode: "return static_file('index.html')  // Change if desired",
        isProductionVersion: desiredVersion
      });
      this.add(route);
      return route.save();
    };

    RouteCollection.prototype.comparator = function(route) {
      return route.get("routePath");
    };

    RouteCollection.prototype.findRouteForPath = function(routePath) {
      var matchedRoute,
        _this = this;
      matchedRoute = this.find(function(route) {
        return route.get("isProductionVersion") && routePath.match(route.pathRegex) !== null;
      });
      return matchedRoute;
    };

    RouteCollection.prototype.getRouteCode = function(routePath) {
      return this.findWhere({
        routePath: routePath
      }).get("routeCode");
    };

    RouteCollection.prototype.createProductionVersion = function() {
      var developmentFiles, productionFiles,
        _this = this;
      productionFiles = this.where({
        isProductionVersion: true
      });
      _.each(productionFiles, function(route) {
        return route.destroy();
      });
      developmentFiles = this.where({
        isProductionVersion: false
      });
      return _.each(developmentFiles, function(route) {
        var attrs, productionVersion;
        attrs = _.clone(route.attributes);
        attrs.id = null;
        attrs.productionVersion = null;
        productionVersion = new Route(attrs);
        productionVersion.set("isProductionVersion", true);
        _this.add(productionVersion);
        productionVersion.save();
        return route.save("productionVersion", productionVersion);
      });
    };

    return RouteCollection;

  })(Backbone.Collection);

}).call(this);
