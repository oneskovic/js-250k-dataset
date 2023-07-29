vui.suggestion = function(options){
	suggestion.init(options);
}

var suggestion = {
	init:function(options){
		options = $.extend({
			ele:null,
			contentId :'suggestionContent',
			contentClass :''
		},options);

		this.ele = $('#'+options.ele);
		this.ele.after($('<ul id="'+options.contentId+'" style="display:none" class="'+options.contentClass+'"></ul>'));
		this.content = $('#'+options.contentId);
		this.rander();
		this.set();
		this.bind();
	},
	bind:function(){
		var self = this;
		this.ele.keyup(function(e){
			var key = $(this).val();
			self.get(key);
		});

		$(window).resize(function(){
			self.set();
		})
	},
	rander:function(){
		var self = this;
		if (typeof bdsug == 'undefined'){
			var bdsug = {};
			window.bdsug = bdsug;
		}

		window.bdsug.sug = function(data){
			var sug = data.s;
			var sugLength = sug.length ;
			if (sugLength>0){
				var html = '';
				for (var i=0 ; i<sugLength ;i ++ ){
					html += '<li><a>'+sug[i] +'</a></li>';
				}
				self.content.html(html).show();

				$('li',self.content).click(function(){
					var key = $(this).text();
					self.content.hide();
					self.ele.val(key);
				})

			}else{
				self.content.hide();
			}
		}	 
	},
	//主体宽高设置
	set:function(){
		var left = this.ele.offset().left;
		var top = this.ele.offset().top;
		var height = this.ele.outerHeight();
		top = top + height;
		 this.content.css({position:'absolute',top:top,left:left})
	},
	get:function(key){
		var url = "http://suggestion.baidu.com/su?wd="+key+"&cb=window.bdsug.sug&t="+Math.random();
		$.ajax({
			type:'GET',
			url:url,
			dataType:'jsonp'
		}); 
	}
};