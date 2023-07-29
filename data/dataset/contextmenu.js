vui.contextmenu = function(obj,options){
	 options = $.extend({
		menu : null, //菜单主体
		zIndex : 2, //菜单z-index
		autoShow : true ,//自适应:即在主体元素有被遮挡时,把主体转移到上面
		preventContextmenu : true, //阻止右键菜单
		diff:2, //当前位置与菜单展示位置的差值
		callback:null
	 },options);
	var contextmenu = {
		el:obj,
		menu:options.menu,
		init:function(){
			if (options.preventContextmenu){
				this.preventContextmenu(options.preventContextmenu);
			}
			if (options.menu == null){
				alert('options error');
			}
			
			var o = this;
			this.hide();
			this.preventContextmenu(this.menu);
			this.setStyle();
			this.el.bind('contextmenu',function(event){
				event.preventDefault();
				var x = event.pageX+options.diff;
				var y = event.pageY+options.diff;
				if (options.autoShow){
					var docHeight = $(window).height()+$(document).scrollTop();
					var coreTop = y - options.diff + options.menu.outerHeight();
					if (coreTop>docHeight){
						y = y - options.menu.outerHeight();
					}
				}
				options.menu.css({
					left:x,
					top:y
				})
				o.show();
				o.clickBodyHide();
			})
		},
		clickBodyHide:function(){
			var  o = this;
			 $('html').one('click',function(){
				 o.hide();
			 })
		},
		preventContextmenu:function(o){
			o.bind('contextmenu',function(event){
				 return false;
			}) 
		},
		setStyle:function(){
			 this.menu.css({
				zIndex:options.zIndex,
				position:'absolute'
			 });
			 this.menu.appendTo('body');
		},
		show:function(){
			 this.menu.show();
		},
		hide:function(){
			 this.menu.hide();
		}
	}
	
	contextmenu.init();
}

