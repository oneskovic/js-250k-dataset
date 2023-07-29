/**
 * @description Creates a new DefDescriptor (definition descriptor) instance, including the prefix and namespace.
 * @constructor
 * @param {Object} descriptor Throws an error if descriptor is null or undefined.
 */
function DefDescriptor(descriptor){
    var prefix=DefDescriptor.normalize(descriptor).split("://");
    var namespace=prefix[1].split(/[:.]/);
    var hasNamespace=namespace.length>1;
    var separator=hasNamespace?prefix[1].indexOf(':')>-1?':':'.':'';

    this.prefix=prefix[0];
    this.namespace=hasNamespace?namespace[0]:'';
    this.name=namespace[hasNamespace?1:0];
    //this.qualifiedName=$A.util.format("{0}://{1}{2}{3}",this.prefix,this.namespace,separator,this.name);
    this.qualifiedName = this.prefix+"://"+this.namespace+separator+this.name;
}

// Static Members
DefDescriptor.DESCRIPTOR="descriptor";

DefDescriptor.normalize=function(descriptor){
    if(descriptor&&descriptor.hasOwnProperty(DefDescriptor.DESCRIPTOR)){
        descriptor=descriptor[DefDescriptor.DESCRIPTOR];
    }
    if(!descriptor){
        throw new Error("DefDescriptor.normalize(): 'descriptor' must be a valid config Object or String.");
    }
    if((descriptor+'').indexOf("://")<0){
        descriptor="markup://"+descriptor;
    }
    return descriptor;
};

// Prototype Members
DefDescriptor.prototype.auraType = "DefDescriptor";

/**
 * Gets the qualified name.
 * @returns {String}
 */
DefDescriptor.prototype.getQualifiedName = function(){
    return this.qualifiedName;
};

/**
 * Gets the namespace.
 * @returns {String} namespace
 */
DefDescriptor.prototype.getNamespace = function(){
    return this.namespace;
};

/**
 * Gets the name part of the qualified name.
 * @returns {String}
 */
DefDescriptor.prototype.getName = function(){
    return this.name;
};

/**
 * Gets the prefix of the DefDescriptor.
 * @returns {String}
 */
DefDescriptor.prototype.getPrefix = function(){
    return this.prefix;
};

/**
 * Returns the qualified name in string format.
 * @returns {String}
 */
DefDescriptor.prototype.toString = function(){
    return this.getQualifiedName();
};

//#include aura.system.DefDescriptor_export
