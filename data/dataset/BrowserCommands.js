(function(exports) {

  function Commands() {
  	this.commands={};
  }

  Commands.prototype.addCommand=function(name, help, runnable) {
  	if (name in this.commands) {
  		console.log("WARNING: ignoring duplicate command "+name);
  		return;
  	}
  	this.commands[name] = {help: help, runnable: runnable};
  }

  Commands.prototype.help=function(name, args) {
    var result='';
    for (var command in this.commands) {
      result+=command+'\t'+this.commands[command].help+"\n";
    }
    return result;
  	/*if (! (name in this.commands)) {
  		return "Unknown command "+name;
  	}
  	var context={out: out};
  	return this.commands[name].help.apply(context, args);*/
  }

  Commands.prototype.run=function(name, args) {
    if (name === 'help') {
      return this.help(name, args);
    }
  	if (! (name in this.commands)) {
  		throw 'Unknown command '+name+'. Try "help"';
  	}
  	var context={};
  	return this.commands[name].runnable.call(context, args);
  }

  exports.Commands=new Commands();

})(window);


Commands.addCommand("echo", 
	"Echo the arguments", 
	function(args) {
		return args.join(' ');
	});

Commands.addCommand("open", 
  "Open the given URL", 
  function(args) {
    chrome.app.window.create('commands/webview.html', {innerBounds: {width: 600, height: 400}},
      function(w) {
        w.contentWindow.addEventListener("DOMContentLoaded", function() {
          var doc=w.contentWindow.document;
          var el=doc.querySelector("webview");
          el.src=args[0];
        });
      });
    return "ok, url "+args[0]+" open";
  });
