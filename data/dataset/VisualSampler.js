/* Module Meta Data
	type: Class
	importance: 1
	codeCompleteness: 100
	docCompleteness: 100
*/

/*?
	Introduction
		The =Uize.Widgets.Tools.JsonSerializer.VisualSampler= class implements a visual sampler widget for the =Uize.Widgets.Tools.JsonSerializer.Widget= class.

		*DEVELOPERS:* `Chris van Rensburg`
*/

Uize.module ({
	name:'Uize.Widgets.Tools.JsonSerializer.VisualSampler',
	superclass:'Uize.Widgets.VisualSampler.Widget',
	required:[
		'Uize.Widgets.Tools.JsonSerializer.Widget',
		'Uize.Widgets.Tools.JsonSerializer.TestData',
		'Uize.Json'
	],
	builder:function (_superclass) {
		'use strict';

		return _superclass.subclass ({
			omegastructor:function () {
				this.addSample ({
					source:Uize.Json.to (Uize.Widgets.Tools.JsonSerializer.TestData ())
				});
			},

			set:{
				samplerWidgetClass:Uize.Widgets.Tools.JsonSerializer.Widget
			}
		});
	}
});

