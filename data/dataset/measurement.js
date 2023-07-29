sema.tree.measurement = function(value){
	
	// measurement token e.g 1px 20cm
	this.value = value;
	
	/**
	 * convert the measurement to css alternative
	 * and translate the measurement usint into english
	 */
	this.render = function(){
		
		// get the measurement unit
		var unit = this.value.match(/[^0-9\.\-]+$/);
		
		if( unit!=null && unit.length>0 ){
			unit = unit[0];
		
			// translate teh unit to the css alternative
			var t_unit = sema.utils.translator.translate(unit);
			
			// replace the translated token with the older one
			return this.value.replace(unit,t_unit);
		}
		
		return this.value;
	}
}
