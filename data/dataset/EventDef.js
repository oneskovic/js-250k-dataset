/*jslint sub: true */
/**
 * @description The Event Definition including the descriptor, type, and attributes.
 * An EventDef instance is created as part of Aura initialization.
 * @constructor
 */
function EventDef(config) {
    this.descriptor = new DefDescriptor(config["descriptor"]);
    this.superDef = this.initSuperDef(config);
    this.attributeDefs = config["attributes"];   // TODO: real defs
    this.type = config["type"];
    this.access=config[Json.ApplicationKey.ACCESS];
}

EventDef.prototype.auraType = "EventDef";

/**
 * Gets the event descriptor. (e.g. markup://foo:bar)
 * @returns {Object}
 */
EventDef.prototype.getDescriptor = function(){
    return this.descriptor;
};

/**
 * Gets the event type.
 * @returns {Object}
 */
EventDef.prototype.getEventType = function() {
    return this.type;
};

/**
 * Gets the attribute definitions.
 * @returns {AttributeDef}
 */
EventDef.prototype.getAttributeDefs = function() {
    return this.attributeDefs;
};

/**
 * Gets the event definition for the immediate super type.
 * @returns {EventDef} The EventDef for the immediate super type, or null if none exists (should only be null for aura:event)
 */
EventDef.prototype.getSuperDef = function() {
    return this.superDef;
};

/**
 * Initializes the event definition for the immediate super type.
 * @param {Object} config The argument that contains the super definition, or null if none exists.
 * @private
 */
EventDef.prototype.initSuperDef = function(config) {
    if (config["superDef"]) {
        return $A.eventService.getEventDef(config["superDef"]);
    }else{
        return null;
    }
};

//#include aura.event.EventDef_export
