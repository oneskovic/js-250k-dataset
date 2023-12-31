//#include dom/base.js

/**
 * 一个标签选择器。
 */
var TagChooser = Base.extend({

	cssClass: 'x-tagchooser',
	
	seperator: ' ',
	
	prefix: '✚ ',
	
	onTargetChange: function(){
		var seperator = this.seperator,
			content = seperator + Dom.getText(this.target) + seperator,
			selectedClass = this.cssClass + '-selected';
		
		this.tags.forEach(function(elem){
			Dom.toggleClass(elem, selectedClass, content.indexOf(seperator + Dom.getText(elem).substr(2) + seperator) > -1);
		});
		
	},
	
	onTagClick: function(tag){
		var seperator = this.seperator,
			value = Dom.getText(this.target), newValue = Dom.getText(tag).substr(this.prefix.length),
			selectedClass = this.cssClass + '-selected';
		if (Dom.hasClass(tag, selectedClass)) {
			value = value.split(seperator);
			while(value.remove(newValue) >= 0);
			Dom.setText(this.target, value.join(seperator));
			Dom.removeClass(tag, selectedClass);
		} else if((seperator + value + seperator).indexOf(seperator + newValue + seperator) === -1) {
			Dom.addClass(tag, selectedClass);
			Dom.setText(this.target, (value ? value + seperator : value) + newValue);
		} else {
			Dom.addClass(tag, selectedClass);
		}
	},
	
	constructor: function(target, tags, prefix){
		
		var me = this;
		
		me.target = Dom.find(target);
		me.tags = Dom.query(tags);
		
		if(prefix !== undefined){
			this.prefix = prefix;
		}

		me.tags.forEach(function (elem) {

			Dom.on(elem, 'click', function () {
				me.onTagClick(this);
			});

			Dom.setText(elem, this.prefix + Dom.getText(elem));
		}, me);
		
		Dom.on(me.target, 'keyup', me.onTargetChange, me);
		
		me.onTargetChange();
		
	}

});