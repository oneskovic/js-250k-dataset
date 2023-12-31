define.Class(
    'raptor/templating/taglibs/core/InvokeNode',
    'raptor/templating/compiler/Node',
    ['raptor'],
    function(raptor, require) {
        'use strict';
        
        var forEach = raptor.forEach;
        
        var InvokeNode = function(props) {
            InvokeNode.superclass.constructor.call(this);
            if (props) {
                this.setProperties(props);
            }
        };
        
        InvokeNode.prototype = {

            doGenerateCode: function(template) {
                
                var func = this.getProperty("function"),
                    funcDef,
                    bodyParam,
                    definedFunctions = template.getAttribute("core:definedFunctions");
                
                if (!func) {
                    this.addError('"function" attribute is required');
                    return;
                }
                
                if (func.indexOf('(') === -1) {
                    
                    funcDef = definedFunctions ? definedFunctions[func] : null;
//                    if (!funcDef) {
//                        this.addError('Function with name "' + func + '" not defined using <c:define>.');
//                    }
                    
                    var argParts = [];
                    var validParamsLookup = {};
                    var params = [];
                    
                    if (funcDef) {
                        params = funcDef.params || [];
                        bodyParam = funcDef.bodyParam;
                        /*
                         * Loop over the defined parameters to figure out the names of allowed parameters and add them to a lookup
                         */
                        forEach(params, function(param) {
                            validParamsLookup[param] = true;
                        }, this);
                        
                    }

                    var bodyArg = null;
                    
                    if (this.hasChildren()) {
                        if (!funcDef || !funcDef.bodyParam) {
                            this.addError('Nested content provided when invoking macro "' + func + '" but defined macro does not support nested content.');
                        }
                        else {
                            bodyArg = this.getBodyContentExpression(template, false);
                        }
                        
                    }

                    /*
                     * VALIDATION:
                     * Loop over all of the provided attributes and make sure they are allowed 
                     */
                    this.forEachPropertyNS('', function(name, value) {
                        if (name === 'function') {
                            return;
                        }
                        
                        if (!validParamsLookup[name]) {
                            this.addError('Parameter with name "' + name + '" not supported for function with name "' + func + '". Allowed parameters: ' + params.join(", "));
                        }
                    }, this);
                    
                    /*
                     * One more pass to build the argument list
                     */
                    forEach(params, function(param) {
                        validParamsLookup[param] = true;
                        if (param === bodyParam) {
                            argParts.push(bodyArg ? bodyArg : "undefined");
                        }
                        else {
                            var arg = this.getAttribute(param);
                            if (arg == null) {
                                argParts.push("undefined");
                            }
                            else {
                                argParts.push(this.getProperty(param));
                            }
                        }
                        
                    }, this);
                    
                    template.write(func + "(" + argParts.join(",") + ")");
                }
                else {
                    var funcName = func.substring(0, func.indexOf('('));
                    funcDef = definedFunctions ? definedFunctions[funcName] : null;
                    if (funcDef) {
                        template.write(func);
                    }
                    else {
                        template.statement(func + ";\n");
                    }
                }
            }
            
        };
        
        return InvokeNode;
    });