Function.RegisterNamespace("Test.Components.Ui.Scroller");

[Fixture]
Test.Components.Ui.Scroller.Raf=function(){

	var windowMock=Test.Mocks.NeededMocks.getWindowMock();
	
	[Fixture]
	function RequestsAnimationFrame(){

		[Fact]
		function ExecutesCallBackIfRafNotDefined(){
			var element={property:"false"};

			windowMock(function(){	
				window.requestAnimationFrame(function(){
					element.property=true;
				},element);
			});

			Assert.True(element.property);
		}

		[Fact]
		function ClearsTimeout(){
			var cancelAnimationFrameMock,id,actual;

			windowMock(function(){	
				id=window.requestAnimationFrame(function(){});
				cancelAnimationFrameMock=Mocks.GetMock(window,"cancelAnimationFrame",function(id){
					return window.clearTimeout(id);	
				});
				cancelAnimationFrameMock(function(){
					actual=window.cancelAnimationFrame(id);
				});
				
			});

			Assert.True(actual);
		}
	}
}
