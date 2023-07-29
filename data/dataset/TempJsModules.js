/* Module Meta Data
	type: Package
	importance: 5
	codeCompleteness: 100
	docCompleteness: 100
*/

/*?
	Introduction
		The =Uize.Build.FileBuilders.TempJsModules= module defines a file builder for regular JavaScript modules in the site temp folder.

		*DEVELOPERS:* `Chris van Rensburg`

		Functions defined in the file builder are called as instance methods on an instance of a subclass of the =Uize.Services.FileBuilderAdapter= class, so the functions can access instance methods implemented in this class.
*/

Uize.module ({
	name:'Uize.Build.FileBuilders.TempJsModules',
	required:'Uize.Build.Util',
	builder:function () {
		'use strict';

		return Uize.package ({
			description:'Regular JavaScript modules under temp',
			urlMatcher:function (_urlParts) {
				var _pathname = _urlParts.pathname;
				return (
					_urlParts.fileType == 'js' &&
					this.isTempUrl (_pathname) &&
					this.fileExists ({path:this.sourceUrlFromTempUrl (_pathname)})
				);
			},
			builderInputs:function (_urlParts) {
				return {sourceJs:this.sourceUrlFromTempUrl (_urlParts.pathname)};
			}
		});
	}
});

