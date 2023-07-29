/**
 * @see    http://moobilejs.com/doc/latest/View/ViewStack
 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
 * @since  0.1.0
 */
Moobile.ViewStack = new Class({

	Extends: Moobile.View,

	/**
	 * @overridden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	willBuild: function() {
		this.parent();
		this.addClass('view-stack');
	}

});

//------------------------------------------------------------------------------
// Roles
//------------------------------------------------------------------------------

Moobile.Component.defineRole('view-stack', null, null, function(element) {
	this.addChildComponent(Moobile.Component.create(Moobile.ViewStack, element, 'data-view-stack'));
});
