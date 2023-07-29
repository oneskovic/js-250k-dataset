Function.RegisterNamespace("Test.Components.Ui.Scroller");

[Fixture]
Test.Components.Ui.Scroller.Helpers=function(){

	var targetHelper,
		helpers,
		windowMock=Test.Mocks.NeededMocks.getWindowMock();

	windowMock(function(){
		var callback = function (path, fn) {fn();};
		ImportJson("ui.scrollerLib.bootstrap", callback);
		ImportJson("ui.scrollerLib.helpers", callback);

		ImportJson("ui.scroller.scrollerHelper",function(path,result){
			targetHelper=result;
		});
		helpers = targetHelper.getScrollerNamespace().helpers;
	});

	[Fixture]
	function MergesTwoObjects(){

		[Fact,Data({
			obj1:{0: "0", 1: "1", 2: "2", fObj1: function(){}},
			obj2:{0: "00", 3: "3", 4: "4", fObj2: function(){}},
			expected:{0: "00", 1: "1", 2: "2", 3: "3", 4: "4", fObj1: function(){}, fObj2: function(){}}
		},{
			obj1:{'': ''},
			obj2:{},
			expected:{'': ""}
		})]
		function MergeObjects(data){
			//Arrange
			var obj1=data.obj1,
				obj2=data.obj2,
				expected=data.expected,
				actual;
			
			//Act
			windowMock(function(){
				actual=helpers.simpleMerge(obj1,obj2);
			});

			//Assert
			Assert.Equal(expected,actual);
		}

		[Fact]
		function ReturnsEmptyObject(){
			var expected={},
				actual;

			//Act
			windowMock(function(){
				actual=helpers.simpleMerge();
			});

			//Assert
			Assert.Equal(expected,actual);
		}
	}
}