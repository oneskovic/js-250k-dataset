//#ifdef __WITH_XSDSIMPLETYPE
apf.XsdSimpleType = function(struct, tagName){
    this.$init(tagName || "simpletype", apf.NODE_HIDDEN, struct);
    
    var lastName;
    this.$propHandlers["name"] = function(value){
        if (lastName) {
            apf.xsd.custumTypeHandlers[value] = 
                apf.xsd.custumTypeHandlers[lastName]
            apf.xsd.custumTypeHandlers[lastName] = null;
        }
        
        lastName = value;
    };
};

(function(){
    this.$compile = function(stack){
        var i, l, nodes, node;
        if (!this.parentNode.$compile) {
            stack = [];
    
            nodes = this.childNodes;
            for (i = 0, l = nodes.length; i < l; i++)
                (node = nodes[i]).$compile && node.$compile(stack);
    
            stack.push("return true;");
            apf.xsd.custumTypeHandlers[this.name] =
                new Function('value', stack.join("\n"));
        }
        else {
            nodes = this.childNodes;
            for (i = 0, l = nodes.length; i < l; i++)
                (node = nodes[i]).$compile && node.$compile(stack);
        }
    };
}).call(apf.XsdSimpleType.prototype = new apf.XsdElement());

apf.xsd.setElement("simpletype", apf.XsdSimpleType);
//#endif