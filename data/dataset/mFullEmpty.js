/* Module Meta Data
	type: Class
	importance: 5
	codeCompleteness: 100
	docCompleteness: 25
*/

/*?
	Introduction
		The =Uize.Widgets.Bar.FullEmpty.mFullEmpty= module implements a mixin that lets you mix in the full/empty styling functionality for bar and slider V2 widget classes.

		*DEVELOPERS:* `Chris van Rensburg`
*/

Uize.module ({
	name:'Uize.Widgets.Bar.FullEmpty.mFullEmpty',
	builder:function () {
		'use strict';

		return function (_class) {
			_class.declare ({
				stateProperties:{
					emptyColor:{
						value:'#fff'
					},
					fullColor:{
						value:'#fff'
					},

					/*** derived properties ***/
						fullStyleTop:{
							derived:
								'orientation,valuePosPercent: orientation == "horizontal" ? 0 : 100 - valuePosPercent + "%"'
						},
						fullStyleRight:{
							derived:
								'orientation,valuePosPercent: orientation == "vertical" ? 0 : 100 - valuePosPercent + "%"'
						},
						emptyStyleBottom:{
							derived:
								'orientation,valuePosPercent: orientation == "horizontal" ? 0 : valuePosPercent + "%"'
						},
						emptyStyleLeft:{
							derived:
								'orientation,valuePosPercent: orientation == "vertical" ? 0 : valuePosPercent + "%"'
						}
				},

				htmlBindings:{
					fullColor:'full:style.backgroundColor',
					emptyColor:'empty:style.backgroundColor',
					fullStyleTop:'full:style.top',
					fullStyleRight:'full:style.right',
					emptyStyleBottom:'empty:style.bottom',
					emptyStyleLeft:'empty:style.left'
				}
			});
		};
	}
});

