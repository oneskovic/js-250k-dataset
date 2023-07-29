(function(){



	dohx.add({name:"Input types on touchscreens",
		mqcExecutionOrderBaseOffset:600000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{

				/*
					Precondition: test MUST be done on touchscreen devices only.
				*/

				id: 1,
				name:"Precondition",
				instructions: 'Do these tests ONLY if you are on a pure touchscreen device. If you are not, do not execute the tests.',
				test: function (t) {
					t.success(true);
				},
			},

		{

				/*
					Test INTERFACE purpose for input type="number" on touchscreen devices
				*/

				id:100,
				name:"Number type - touchscreen interface",
				definedInSpecs:["http://www.w3.org/TR/html5/number-state.html#number-state"],
				instructions:[
					"Click 'GO'!",
					"Click the input element."
				],
				expectedResult:"Does the device display a keyboard where the number keys have a prominent place?",
				test:function(t){
					dohx.showInfo('<form><input type="number" /></form>');
				}
			},
		{

				/*
					Test INTERFACE purpose for input type="email" on touchscreen devices
				*/

				id:200,
				name:"Email type - touchscreen interface",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#e-mail-state"],
				instructions:[
					"Click 'GO'!",
					"Click the input element."
				],
				expectedResult:"Does the device display a keyboard where the @ key is visible?",
				test:function(t){
					dohx.showInfo('<form><input type="email" /></form>');
				}
			},
		{

				/*
					Test INTERFACE purpose for input type="url" on touchscreen devices
				*/

				id:300,
				name:"URL type - touchscreen interface",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#url-state"],
				instructions:[
					"Click 'GO'!",
					"Click the input element."
				],
				expectedResult:"Does the device display a keyboard where the / and . keys are visible?",
				test:function(t){
					dohx.showInfo('<form><input type="url" /></form>');
				}
			},
		{

				/*
					Test INTERFACE purpose for input type="tel" on touchscreen devices
				*/

				id:400,
				name:"Tel type - touchscreen interface",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#telephone-state"],
				instructions:[
					"Click 'GO'!",
					"Click the input element."
				],
				expectedResult:"Does the device display a keyboard where the number keys have a prominent place?",
				test:function(t){
					dohx.showInfo('<form><input type="tel" /></form>');
				}
			},
//*/
		]
	});
})();
