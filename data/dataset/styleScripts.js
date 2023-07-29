StyleScripts = new function StyleScripts(){
	/******[ private vars ]******/
	var StyleScripts = this;	// workaround for bug in ECMAScript Language Specification which causes 'this' to be set incorrectly for inner functions
	var cache = new Array;		// stores rulesets
	
	/******[ privileged methods ]******/
	// Store rules in cache
	this.register = function(rules){
		cache.push(rules);
	};

	// Apply rules stored in cache
	this.apply = function(){
		for (var i = 0; rules = cache[i]; i++){
			for (selector in rules){
				$$(selector).each(
					function(el){
						if (!(el.hasClassName('applied'))) rules[selector](el);
						el.addClassName('applied');
					}
				);
			}
		}
	};
	
	// Apply rules once DOM is ready
	document.observe('dom:loaded', StyleScripts.apply);
}