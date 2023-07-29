Function.RegisterNamespace("Test.Components.Ui.Scroller");

[Fixture, Skip("@dval: Fix classList dependency, Im in a rush...")]
Test.Components.Ui.Scroller.EndlessPluginTests=function(){

	var targetHelper,
		plugins,
		windowMock=Test.Mocks.NeededMocks.getWindowMock();
	
	windowMock(function(){
		var callback = function (path, fn) {fn();};
		ImportJson("ui.scrollerLib.bootstrap", callback);
		ImportJson("ui.scrollerLib.browserSupport", callback);
		ImportJson("ui.scrollerLib.browserStyles", callback);
		ImportJson("ui.scrollerLib.helpers", callback);
		ImportJson("ui.scrollerLib.CubicBezier", callback);
		ImportJson("ui.scrollerLib.ScrollerJS", callback);
		ImportJson("ui.scrollerLib.InfiniteLoading", callback);

		ImportJson("ui.scroller.scrollerHelper",function(path,result){
			targetHelper=result;
		});
		plugins=targetHelper.getScrollerNamespace().plugins;
	});

	[Fixture]
	function FetchData(){

		[Fact]
		function ExecutesDataProvider(){
			var infiniteLoadingPlugin,
				expected=false;

			windowMock(function(){
				infiniteLoadingPlugin = new plugins.InfiniteLoading();	
				infiniteLoadingPlugin.opts={
					infiniteLoadingConfig:{
						dataProvider:function(){expected=true;}	
					}
				};
				infiniteLoadingPlugin.fetchData();
			});

			Assert.True(expected);
		}

		[Fact]
		function CanExecuteTriggerCallbackToAppendItems(){
			var infiniteLoadingPlugin,
				callback,
				appendItemsMock,
				itemsLength;

			windowMock(function(){
				infiniteLoadingPlugin = new plugins.InfiniteLoading();	
				infiniteLoadingPlugin.opts={
					infiniteLoadingConfig:{
						dataProvider:function(a,b){
							callback=arguments[0];
						}	
					}
				};
				infiniteLoadingPlugin.fetchData();
			});
			appendItemsMock=Mocks.GetMock(infiniteLoadingPlugin, "appendItems", function(items){
				itemsLength=items.length;
			});

			appendItemsMock(function(){
				callback(0,[1,2]);
			});

			Assert.True(itemsLength===2);
		}

		[Fact]
		function LocksFetchDataIfNoItems(){
			var infiniteLoadingPlugin,
				callback,
				appendItemsMock;

			windowMock(function(){
				infiniteLoadingPlugin = new plugins.InfiniteLoading();
				infiniteLoadingPlugin._ilNoMoreData = false;
				infiniteLoadingPlugin.opts={
					infiniteLoadingConfig:{
						dataProvider:function(a,b){
							callback=arguments[0];
						}	
					}
				};
				infiniteLoadingPlugin.fetchData();
			});
			appendItemsMock=Mocks.GetMock(infiniteLoadingPlugin, "appendItems", function(items){});

			appendItemsMock(function(){
				callback(0,[]);
			});

			Assert.True(infiniteLoadingPlugin._ilNoMoreData);
		}
	}
}