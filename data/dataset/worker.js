(function(){
  var sheet, errs, vals;
  self.onmessage = function(arg$){
    var data, ref$, i$, coord;
    data = arg$.data;
    ref$ = [data, {}, {}], sheet = ref$[0], errs = ref$[1], vals = ref$[2];
    for (i$ in sheet) {
      (fn$.call(this, i$));
    }
    for (coord in sheet) {
      self[coord];
    }
    return postMessage([errs, vals]);
    function fn$(coord){
      var i$, ref$, p, c, len$;
      for (i$ = 0, len$ = (ref$ = (fn$())).length; i$ < len$; ++i$) {
        (fn1$.call(this, ref$[i$]));
      }
      function fn$(){
        var i$, ref$, len$, j$, ref1$, len1$, results$ = [];
        for (i$ = 0, len$ = (ref$ = ['', '$']).length; i$ < len$; ++i$) {
          p = ref$[i$];
          for (j$ = 0, len1$ = (ref1$ = [coord, coord.toLowerCase()]).length; j$ < len1$; ++j$) {
            c = ref1$[j$];
            results$.push(p + c);
          }
        }
        return results$;
      }
      function fn1$(name){
        var ref$;
        if ((ref$ = Object.getOwnPropertyDescriptor(self, name)) != null && ref$.get) {
          return;
        }
        Object.defineProperty(self, name, {
          get: function(){
            var x, e, that;
            if (coord in vals) {
              return vals[coord];
            }
            vals[coord] = NaN;
            x = +sheet[coord];
            if (sheet[coord] !== x + "") {
              x = sheet[coord];
            }
            try {
              vals[coord] = '=' === x[0] ? eval.call(null, x.slice(1)) : x;
            } catch (e$) {
              e = e$;
              if (that = /\$?[A-Za-z]+[1-9][0-9]*\b/.exec(e) && !((that != null ? that[0] : void 8) in self)) {
                self[that[0]] = 0;
                delete vals[coord];
                return self[coord];
              }
              errs[coord] = e + "";
            }
            return typeof vals[coord] === 'number'
              ? vals[coord]
              : vals[coord] += '';
          }
        });
      }
    }
  };
}).call(this);
