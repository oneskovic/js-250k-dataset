/*jslint sub: true */
/**
 * @description A LayoutItemDef instance that is created with LayoutDef.
 * @param {Object} config
 * @constructor
 * @protected
 */
function LayoutItemDef(config){
    this.container = config["container"];
    this.body = config["body"];
    this.cache = config["cache"];
    this.action = config["action"];
}

LayoutItemDef.prototype.auraType = "LayoutItemDef";

/**
 * Returns the container.
 */
LayoutItemDef.prototype.getContainer = function(){
    return this.container;
};

/**
 * Returns the body.
 */
LayoutItemDef.prototype.getBody = function(){
    return this.body;
};

/**
 * Returns the cache.
 */
LayoutItemDef.prototype.getCache = function(){
    return this.cache;
};

/**
 *
 * @param {Object} valueProvider
 */
LayoutItemDef.prototype.getAction = function(valueProvider){
    var body = this.body;
    if(body && body.length > 0){
        var action = $A.get("c.aura://ComponentController.getComponents");
        var components = [];

        for(var i=0;i<body.length;i++){
            var cdr = body[i];
            var config = {"descriptor" : cdr["componentDef"]["descriptor"]};
            var attributes = cdr["attributes"];
            if(attributes){
                var attConfigs = attributes["values"];
                var atts = {};
                config["attributes"] = atts;
                for(var key in attConfigs){
                    var value = attConfigs[key];
                    if(value !== undefined){
                        atts[key] = value.value;
                    }
                }
            }
            components.push(config);
        }
        action.setParams({"components" : components});
        return action;
    }else{
        if(aura.util.isExpression(this.action)){
            return this.action.evaluate(valueProvider);
        }else{
            return valueFactory.create(this.action,null,valueProvider).evaluate();
        }
    }
};

LayoutItemDef.prototype.setCachedBody = function(inst){
    this.cachedBody = inst;
};

LayoutItemDef.prototype.getCachedBody = function(){
    return this.cachedBody;
};
