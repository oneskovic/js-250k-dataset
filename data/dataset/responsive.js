(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.ResponsiveView = (function(_super) {

    __extends(ResponsiveView, _super);

    function ResponsiveView() {
      return ResponsiveView.__super__.constructor.apply(this, arguments);
    }

    ResponsiveView.prototype.assets = {
      logo: "modeset-crest.png"
    };

    ResponsiveView.prototype.initialize = function(_arg) {
      var tests;
      this.startTime = _arg.startTime, this.endTime = _arg.endTime, this.downloadSize = _arg.downloadSize;
      tests = [this.onWifi(), this.isRetina()];
      console.log("tests", tests);
      this.highres = _.all(tests, function(t) {
        return t === true;
      });
      return this.loadAssets();
    };

    ResponsiveView.prototype.loadAssets = function() {
      if (this.highres === true) {
        _.each(this.assets, function(asset) {
          var image, newImage;
          image = $("img[src*='" + asset + "']");
          $(image).hide();
          newImage = new Image();
          newImage.onload = function() {
            $(image).html(this);
            return $(image).show("slow");
          };
          newImage.onError = function() {
            return typeof console !== "undefined" && console !== null ? console.log("cant find that image") : void 0;
          };
          return newImage.src = "/images/highres/" + asset;
        });
      }
      return $("img.spinner").hide();
    };

    ResponsiveView.prototype.isRetina = function() {
      return this.retinaEnabled || (this.retinaEnabled = (function() {
        var ratio;
        ratio = parseInt(window.devicePixelRatio);
        return ratio > 1;
      })());
    };

    ResponsiveView.prototype.onWifi = function() {
      return this.deviceSpeed() > 10;
    };

    ResponsiveView.prototype.deviceSpeed = function() {
      var _this = this;
      return this.speedMbps || (this.speedMbps = (function() {
        var bitsLoaded, duration, speedBps, speedKbps, speedMbs;
        duration = (_this.endTime - _this.startTime) / 1000;
        bitsLoaded = _this.downloadSize * 8;
        speedBps = bitsLoaded / duration;
        speedKbps = speedBps / 1024;
        speedMbs = speedKbps / 1024;
        console.log(duration, bitsLoaded, speedBps, speedKbps, speedMbs);
        return speedMbs;
      })());
    };

    return ResponsiveView;

  })(Backbone.View);

}).call(this);
