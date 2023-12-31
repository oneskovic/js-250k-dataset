/* Module Meta Data
	type: Package
	importance: 5
	codeCompleteness: 100
	docCompleteness: 100
*/

/*?
	Introduction
		The =UizeSite.Build.FileBuilders.TempExamplesInfoForSiteMapModule= module defines a file builder for the generated =UizeSite.ExamplesInfoForSiteMap= module in the site temp folder.

		*DEVELOPERS:* `Chris van Rensburg`

		Functions defined in the file builder are called as instance methods on an instance of a subclass of the =Uize.Services.FileBuilderAdapter= class, so the functions can access instance methods implemented in this class.
*/

Uize.module ({
	name:'UizeSite.Build.FileBuilders.TempExamplesInfoForSiteMapModule',
	required:'Uize.Build.Util',
	builder:function () {
		'use strict';

		var _examplesInfoForSiteMapModuleName = 'UizeSite.ExamplesInfoForSiteMap';

		return Uize.package ({
			description:'Generated UizeSite.ExamplesInfoForSiteMap module under temp',
			urlMatcher:function (_urlParts) {
				return _urlParts.pathname == this.tempUrl (this.getModuleUrl (_examplesInfoForSiteMapModuleName));
			},
			builderInputs:function () {
				return {examplesInfoForSiteMap:this.memoryUrl ('examples-info-for-sitemap')};
			},
			builder:function (_inputs) {
				return Uize.Build.Util.dataAsModule (
					_examplesInfoForSiteMapModuleName,
					this.readFile ({path:_inputs.examplesInfoForSiteMap})
				);
			}
		});
	}
});

