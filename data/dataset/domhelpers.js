WAF.define('waf-behavior/domhelpers', function() {
    "use strict";
    var Behavior = WAF.require('waf-core/behavior');
    
    /**
     * @class DomHelpers
     * @augments Observable
     */
    var klass = Behavior.create();
    var proto = klass.prototype;
    klass.inherit(WAF.require('waf-behavior/observable'));
    klass._mappedDomEvents = [];
    klass.mergeClassAttributeOnInherit('_mappedDomEvents');

    /**
     * An event modifier callback.
     * Used to change the wakanda event instance before firing it (i.e.: addind values to #data object).
     * @this The widget that fire the event
     * @callback DomHelpers~eventCallback
     * @param {Event} event - The event instance
     */

    /**
     * Configure the widget to send a Wakanda Event when the specified dom event happen
     * @param {object} map - event mapping (keys : dom event to listen, values : wakanda events to fire
     * @param {string} [selector] - A selector, to restricit the dom event binding on specific sub node.
     * @memberof DomHelpers
     * @method mapDomEvents
     */
    klass.mapDomEvents = function(map, selector) {
        var that = this;

        Object.keys(map).forEach(function(events) {
            events.split(' ').forEach(function(event) {
                if(event) {
                    that._mappedDomEvents.push({ 
                        domEvent: event,
                        event: map[events],
                        selector: selector
                    });
                }
            });
        });
    };
    
    /**
     * Called to initialize behaviors properties
     * @private
     * @memberof DomHelpers
     * @instance
     * @method _initProperties
     */
    proto._initProperties = function() {
        this._mappedDomEvents = this.constructor._mappedDomEvents.map(function(d) {
            return WAF.extend(true, {}, d);
        });
    };
        
    /**
     * Called to initialize dom event when a subscriber is created
     * @param {Event} event - The event subscribed
     * @private
     * @memberof DomHelpers
     * @instance
     * @method _initSubscriber
     */
    proto._initSubscriber = function(event) {
        this._mappedDomEvents.forEach(function(mappedDomEvent) {
            if(mappedDomEvent.handler) {
                return;
            }
    
            if(Array.isArray(mappedDomEvent.event)) {
                if(mappedDomEvent.event.indexOf(event) < 0) {
                    return;
                }
            } else {
                if(mappedDomEvent.event !== event) {
                    return;
                }
            }
            mappedDomEvent.handler = function(event) {
                if(!this.disabled()) {
                    this.fire(mappedDomEvent.event, { domEvent: event });
                }
                event.stopPropagation();
            }.bind(this);

            var $element = mappedDomEvent.selector ? $(mappedDomEvent.selector, this.node) : $(this.node);
            
            $element.on(mappedDomEvent.domEvent, mappedDomEvent.handler);
        }.bind(this));
    };
    
    /**
     * Called to remove dom event when a subscriber is removed
     * @param {Event} event - The event subscribed
     * @private
     * @memberof DomHelpers
     * @instance
     * @method _destroySubscriber
     */
    proto._destroySubscriber = function(event) {
        if(!this._mappedDomEvents) {
            return;
        }
        
        this._mappedDomEvents.forEach(function(mappedDomEvent) {
            if(!mappedDomEvent.handler) {
                return;
            }
    
            if(Array.isArray(mappedDomEvent.event)) {
                if(mappedDomEvent.event.indexOf(event) < 0) {
                    return;
                }
            } else {
                if(mappedDomEvent.event !== event) {
                    return;
                }
            }
            
            var $element = mappedDomEvent.selector ? $(mappedDomEvent.selector, this.node) : $(this.node);
            $element.off(mappedDomEvent.domEvent, mappedDomEvent.handler);
            
            delete mappedDomEvent.handler;
        }.bind(this));
    };

    var Widget = WAF.require('waf-core/widget');
    Widget.defaultBehaviors.push(klass); // By inheritance, add Observable

    return klass;
});
