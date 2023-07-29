"use strict";
(function(){
  
  function init() {
  }
  
  function handleQuery(key, val) {
    Espruino.Core.Code.switchToCode(); // if in blockly
    switch(key){
      case "code":
        Espruino.Core.EditorJavaScript.setCode(val);
        break;
      case "upload":
        Espruino.Core.MenuPortSelector.ensureConnected(function() {
          Espruino.Core.Terminal.focus(); // give the terminal focus
          Espruino.callProcessor("sending");
          Espruino.Core.CodeWriter.writeToEspruino(val);
          Espruino.Core.EditorJavaScript.setCode(val);
        });        
        break;
      case "gist":
        Espruino.Core.EditorJavaScript.setCode("Loading...");
        $.getJSON("https://api.github.com/gists/"+ val, function(data){
          if(data && data.files){
            var keys = Object.keys(data.files);
            if(keys.length > 0){
              Espruino.Core.EditorJavaScript.setCode(data.files[keys[0]].content);
            }
          }
        }).error(function(){
          Espruino.Core.EditorJavaScript.setCode("ERROR");
        });
        break;
    }
  }
  
  function handle(url) {    
    console.log("Handling URL "+JSON.stringify(url));
    url = (url);
    var q = url.indexOf("?");
    if (q<0) return;
    var query = url.substr(q+1).split("&");
    for (var i in query) {
      var eq = query[i].split("=");
      if (eq.length==1)
        handleQuery(eq[0],undefined);
      else if (eq.length==2)
        handleQuery(decodeURIComponent(eq[0]),decodeURIComponent(eq[1]));
      else
        console.warn("Didn't understand query section "+JSON.stringify(query[i]));
    }
  }
    

  Espruino.Plugins.URLHandler = {
    init : init,
    
    handle : handle, // handle a URL
  };
}());