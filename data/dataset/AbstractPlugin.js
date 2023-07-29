Ext.define('Ext.AbstractPlugin', {
    disabled: false,

    constructor: function(config) {
        //<debug>
        if (!config.cmp && Ext.global.console) {
            Ext.global.console.warn("Attempted to attach a plugin ");
        }
        //</debug>
        Ext.apply(this, config);
    },

    getCmp: function() {
        return this.cmp;
    },

    /**
     * <p>The init method is invoked after {@link Ext.Component#initComponent initComponent} has been run for the client Component.</p>
     * <p>The supplied implementation is empty. Subclasses should perform plugin initialization, and set up bidirectional
     * links between the plugin and its client Component in their own implementation of this method.</p>
     * @param {Component} client The client Component which owns this plugin.
     * @method
     */
    init: Ext.emptyFn,

    /**
     * <p>The destroy method is invoked by the owning Component at the time the Component is being destroyed.</p>
     * <p>The supplied implementation is empty. Subclasses should perform plugin cleanup in their own implementation of this method.</p>
     * @method
     */
    destroy: Ext.emptyFn,

    /**
     * <p>The base implementation just sets the plugin's <code>disabled</code> flag to <code>false</code></p>
     * <p>Plugin subclasses which need more complex processing may implement an overriding implementation.</p>
     */
    enable: function() {
        this.disabled = false;
    },

    /**
     * <p>The base implementation just sets the plugin's <code>disabled</code> flag to <code>true</code></p>
     * <p>Plugin subclasses which need more complex processing may implement an overriding implementation.</p>
     */
    disable: function() {
        this.disabled = true;
    }
});
