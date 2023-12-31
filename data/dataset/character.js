/*

Character CoffeeScript class.
Creates a main character and controls all of his behavior.

@author: Marcin Wieprzkowicz (marcin.wieprzkowicz@gmail.com)
*/


(function() {
  var Character,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Character = (function(_super) {

    __extends(Character, _super);

    Character.prototype.defaults = {
      animation: {
        gravity: 2
      },
      jump: {
        force: 0,
        height: 120
      }
    };

    function Character(options, audio) {
      this.audio = audio;
      Character.__super__.constructor.apply(this, arguments);
      this.options.jump.force = Math.round(Math.sqrt(2 * this.options.jump.height * this.options.animation.gravity));
      this.setDefaults();
      this.createDomElement();
    }

    Character.prototype.setDefaults = function() {
      this.inAir = false;
      this.appliedForce = 0;
      this.ticks = 1;
      return this;
    };

    Character.prototype.createDomElement = function() {
      var subElement;
      subElement = document.createElement('div');
      subElement.classList.add(this.options.klass);
      this.domElement = document.createElement('div');
      this.domElement.id = this.options.id;
      this.domElement.appendChild(subElement);
      return this;
    };

    Character.prototype.reset = function() {
      this.domElement.style[this.globals.css.transform] = 'translate3d(0, 0, 0)';
      this.domElement.className = '';
      this.setDefaults();
      return this;
    };

    Character.prototype.move = function(inverted) {
      if (inverted == null) {
        inverted = false;
      }
      if (inverted) {
        this.domElement.classList.add('inverted');
      } else {
        this.domElement.classList.remove('inverted');
      }
      if (!this.inAir) {
        this.domElement.classList.add('run');
        if (this.audio.running.getVolume() > 0) {
          this.audio.running.play();
        }
      }
    };

    Character.prototype.jump = function() {
      this.inAir = true;
      this.domElement.classList.add('jump');
      if (this.audio.running.getVolume() > 0) {
        this.audio.running.stop();
      }
    };

    Character.prototype.stop = function(animation) {
      var _this = this;
      switch (animation) {
        case 'run':
          this.domElement.classList.remove('run');
          if (this.audio.running.getVolume() > 0) {
            this.audio.running.stop();
          }
          break;
        case 'jump':
          this.setDefaults();
          this.domElement.classList.add('inAir');
          this.domElement.classList.remove('jump');
          this.domElement.classList.add('landing');
          if (this.audio.landing.getVolume() > 0) {
            this.audio.landing.play();
          }
          setTimeout(function() {
            return _this.domElement.classList.remove('landing', 'inAir');
          }, 200);
      }
    };

    return Character;

  })(Base);

  (typeof exports !== "undefined" && exports !== null ? exports : this).Character = Character;

}).call(this);
