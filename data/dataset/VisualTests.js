/* Module Meta Data
	type: Class
	importance: 1
	codeCompleteness: 5
	docCompleteness: 100
*/

/*?
	Introduction
		The =Uize.Widgets.Tools.MultiLineStringSerializer.VisualTests= class implements a set of visual tests for the =Uize.Widgets.Tools.MultiLineStringSerializer.Widget= class.

		*DEVELOPERS:* `Chris van Rensburg`
*/

Uize.module ({
	name:'Uize.Widgets.Tools.MultiLineStringSerializer.VisualTests',
	superclass:'Uize.Widgets.VisualTests.Widget',
	required:'Uize.Widgets.Tools.MultiLineStringSerializer.Widget',
	builder:function (_superclass) {
		'use strict';

		return _superclass.subclass ({
			omegastructor:function () {
				this.addStateCombinationTestCases ({
					source:[
						'This is some multi-line text',
						'that should be turned into a',
						'multi-line JavaScript string literal',
						'expression that allows text blocks',
						'to be conveniently processed for',
						'inclusion into JavaScript source code.',
						'',
						'You can also convert in the other',
						'direction by first entering a multi-line',
						'JavaScript string literal expression',
						'in the other pane.'
					].join ('\n'),
					quoteChar:['\'','"']
				});
			},

			staticProperties:{
				widgetClass:Uize.Widgets.Tools.MultiLineStringSerializer.Widget
			}
		});
	}
});

