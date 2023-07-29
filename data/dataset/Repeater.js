enyo.kind({
	name: "enyo.Repeater",
	published: {
		//* Number of items
		count: 0
	},
	events: {
		//* Sends the item index, and the item control, for decoration.
		onSetupItem: ""
	},
	create: function() {
		this.inherited(arguments);
		this.countChanged();
	},
	//* @protected
	initComponents: function() {
		this.itemComponents = this.components || this.kindComponents;
		this.components = this.kindComponents = null;
		this.inherited(arguments);
	},
	setCount: function(inCount) {
		this.setPropertyValue("count", inCount, "countChanged");
	},
	countChanged: function() {
		this.build();
	},
	itemAtIndex: function(inIndex) {
		return this.controlAtIndex(inIndex);
	},
	//* @public
	//* Render the list
	build: function() {
		this.destroyClientControls();
		for (var i=0, c; i<this.count; i++) {
			c = this.createComponent({kind: "enyo.OwnerProxy", index: i});
			// do this as a second step so 'c' is the owner of the created components
			c.createComponents(this.itemComponents);
			// invoke user's setup code
			this.doSetupItem({index: i, item: c});
		}
		this.render();
	}
});

// Sometimes client controls are intermediated with null-controls.
// These overrides reroute events from such controls to the nominal delegate,
// as would happen in the absence of intermediation.
enyo.kind({
	name: "enyo.OwnerProxy",
	tag: null,
	decorateEvent: function(inEventName, inEvent, inSender) {
		if (inEvent) {
			inEvent.index = this.index;
		}
		this.inherited(arguments);
	},
	delegateEvent: function(inDelegate, inName, inEventName, inEvent, inSender) {
		if (inDelegate == this) {
			inDelegate = this.owner.owner;
		}
		this.inherited(arguments, [inDelegate, inName, inEventName, inEvent, inSender]);
	}
});