//
//  The configuration defaults, augmented by the user settings
//
MathJax.Extension["TeX/noUndefined"] = {
  version: "2.1",
  config: MathJax.Hub.CombineConfig("TeX.noUndefined",{
    disabled: false,      // set to true to return to original error messages
    attributes: {
      mathcolor: "red"
    }
  })
};

MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {
  var CONFIG = MathJax.Extension["TeX/noUndefined"].config;
  var MML = MathJax.ElementJax.mml;
  var UNDEFINED = MathJax.InputJax.TeX.Parse.prototype.csUndefined;

  MathJax.InputJax.TeX.Parse.Augment({
    csUndefined: function (name) {
      if (CONFIG.disabled) {return UNDEFINED.apply(this,arguments)}
      MathJax.Hub.signal.Post(["TeX Jax - undefined control sequence",name]);
      this.Push(MML.mtext(name).With(CONFIG.attributes));
    }
  });

  MathJax.Hub.Startup.signal.Post("TeX noUndefined Ready");
});

MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/noUndefined.js");
