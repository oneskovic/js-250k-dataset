if (typeof WeakMap === 'undefined') {
  (function() {
    var defineProperty = Object.defineProperty;

    try {
      var properDefineProperty = true;
      defineProperty(function(){}, 'foo', {});
    } catch (e) {
      properDefineProperty = false;
    }

    /*
      IE8 does not support Date.now() but IE8 compatibility mode in IE9 and IE10 does.
      M$ deserves a high five for this one :)
     */
    var counter = +(new Date) % 1e9;

    var WeakMap = function() {
      this.name = '__st' + (Math.random() * 1e9 >>> 0) + (counter++ + '__');
      if(!properDefineProperty){
        this._wmCache = [];
      }
    };

    if(properDefineProperty){
      WeakMap.prototype = {
        set: function(key, value) {
          var entry = key[this.name];
          if (entry && entry[0] === key)
            entry[1] = value;
          else
            defineProperty(key, this.name, {value: [key, value], writable: true});

        },
        get: function(key) {
          var entry;
          return (entry = key[this.name]) && entry[0] === key ?
            entry[1] : undefined;
        },
        'delete': function(key) {
          this.set(key, undefined);
        }
      };
    } else {
      WeakMap.prototype = {
        set: function(key, value) {

          if(typeof key == 'undefined' || typeof value == 'undefined') return;

          for(var i = 0, len = this._wmCache.length; i < len; i++){
            if(this._wmCache[i].key == key){
              this._wmCache[i].value = value;
              return;
            }
          }

          this._wmCache.push({key: key, value: value});

        },
        get: function(key) {

          if(typeof key == 'undefined') return;

          for(var i = 0, len = this._wmCache.length; i < len; i++){
            if(this._wmCache[i].key == key){
              return  this._wmCache[i].value;
            }
          }

          return;

        },
        'delete': function(key) {

          if(typeof key == 'undefined') return;

          for(var i = 0, len = this._wmCache.length; i < len; i++){
            if(this._wmCache[i].key == key){
              Array.prototype.slice.call(this._wmCache, i, 1);
            }
          }
        }
      };
    }

    window.WeakMap = WeakMap;
  })();
}
