var fs = require('fs');

var scanFileOnDisk = function(gjs) { }

scanFileOnDisk.request = function(pipe, options) {
	
	if(!pipe.location.documentRoot)
		return(false);
	
	pipe.request.urlParse.path = decodeURI(pipe.request.urlParse.path);
	pipe.file = pipe.location.documentRoot+
		pipe.request.urlParse.path.replace(/\.\.\//, "/");
	console.log(pipe.file);
	try {
		pipe.fileInfo = fs.statSync(pipe.file);
	} catch(e) {
		delete pipe.fileInfo;
	}
	
	if(!pipe.fileInfo)
		return(true);
	
	/* check for default files */
	if(pipe.fileInfo.isDirectory()) {
		
		if(pipe.location.defaultDocument instanceof Array) {
			for(var a in pipe.location.defaultDocument) {
				var file = pipe.file+'/'+pipe.location.defaultDocument[a];
				try {
					var tmpFileInfo = fs.statSync(file);
					pipe.file = file;
					pipe.fileInfo = tmpFileInfo;
					break;
				} catch(e) { }
			}
		}
		else if(pipe.location.defaultDocument instanceof String) {
			var file = pipe.file+'/'+pipe.location.defaultDocument;
			try {
				var tmpFileInfo = fs.statSync(file);
				pipe.file = file;
				pipe.fileInfo = tmpFileInfo;
			} catch(e) { }
				
		}
	}

}

scanFileOnDisk.ctor = function(gjs) {


}

module.exports = scanFileOnDisk;


