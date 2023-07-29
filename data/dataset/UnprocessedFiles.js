/* Module Meta Data
	type: Class
	importance: 6
	codeCompleteness: 100
	docCompleteness: 3
*/

/*?
	Introduction
		The =Uize.Build.Files.UnprocessedFiles= package provides a method to recurse the source folder for a site and copy unprocessed files (static *.html* pages, static *.css* files, *.gif*, *jpg*, and *.png* image files, etc.) into the built folder.

		*DEVELOPERS:* `Chris van Rensburg`
*/

Uize.module ({
	name:'Uize.Build.Files.UnprocessedFiles',
	builder:function (_superclass) {
		'use strict';

		return _superclass.subclass ({
			staticMethods:{
				determineFilesToBuild:function (_params) {
					var
						_sourcePath = _params.sourcePath,
						_uizePath = _params.uizePath,
						_uizeModulesFolder = _params.uizeModulesFolder || 'js',
						_staticFilePathMatcher = Uize.resolveMatcher (_params.staticFilePathMatcher)
					;
					this.addFiles (
						this.fileSystem.getFiles ({
							path:_params.sourcePath,
							recursive:true,
							pathMatcher:_staticFilePathMatcher
						})
					);
					if (_sourcePath != _uizePath)
						this.addFiles (
							this.fileSystem.getFiles ({
								path:_uizePath + '/' + _uizeModulesFolder,
								recursive:true,
								pathMatcher:function (_filePath) {
									return _staticFilePathMatcher (_filePath) && /^Uize[\.\/]/.test (_filePath);
								},
								pathTransformer:'"' + _params.modulesFolder + '/" + value'
							})
						)
					;
				}
			}
		});
	}
});

