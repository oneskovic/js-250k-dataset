/**
 * The BootstrapController acts like a service controller with asynchronous callback methods for successful
 * and failed authentication service calls.
 */
Ext.define("CafeTownsend.controller.BootstrapController", {
    extend: "FlowMVC.mvc.controller.AbstractController",

    requires: [
        "nineam.locale.store.LocalesStore",
        "nineam.locale.event.LocaleEvent"
    ],

    inject: [
        "logger"
    ],

    /**
     * @event CafeTownsend.event.AuthenticationEvent.LOGIN_SUCCESS
     * Fired when the login service is successful.
     */

    /**
     * Sets up global event bus handlers.
     * @protected
     */
    init: function() {
        this.callParent();
        this.logger.debug("init");

        this.initLocaleManager();
    },

    /**
     * Sets up global event bus handlers.
     * @protected
     */
    setupGlobalEventListeners: function() {
        this.callParent();
        this.logger.debug("setupGlobalEventListeners");

//        this.eventBus.addGlobalEventListener(CafeTownsend.event.AuthenticationEvent.LOGIN, this.onLogin, this);
//        this.eventBus.addGlobalEventListener(CafeTownsend.event.AuthenticationEvent.LOGOUT, this.onLogout, this);
    },

    /**
     * Initializes the Localization Manager loading in two languages for now.
     */
    initLocaleManager: function() {
        var lm = nineam.locale.LocaleManager;
        lm.addListener(nineam.locale.event.LocaleEvent.INITIALIZED, this.localeManagerInitializedEventHandler, this);

        var locales = Ext.create("nineam.locale.store.LocalesStore", {
            data: [
                {id: "en_us", label: "English", url: "locale/en_us.json"},
                {id: "es_us", label: "Spanish", url: "locale/es_us.json"}
            ]
        });
        lm.setLocales(locales);

        var locale = lm.getPersistedLocale();
        locale = locale ? locale : "en_us";
        this.logger.debug("initLocaleManager: locale = " + locale);
        lm.setLocale(locale);
    },

    /**
     * LocaleManager initialized event handler
     */
    localeManagerInitializedEventHandler: function() {
//        Ext.getBody().unmask(); // TODO: not for touch
    }

    ////////////////////////////////////////////////
    // SERVICE SUCCESS/FAULT HANDLERS
    ////////////////////////////////////////////////

    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

});

