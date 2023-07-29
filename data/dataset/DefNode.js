define.Class(
    'raptor/templating/taglibs/core/DefNode',
    'raptor/templating/compiler/Node',
    ['raptor'],
    function(raptor, require) {
        'use strict';
        
        var strings = require('raptor/strings'),
            funcDefRegExp = /^([A-Za-z_][A-Za-z0-9_]*)\(((?:[A-Za-z_][A-Za-z0-9_]*,\s*)*[A-Za-z_][A-Za-z0-9_]*)?\)$/;
        
        var DefNode = function(props) {
            DefNode.superclass.constructor.call(this);
            if (props) {
                this.setProperties(props);
            }
        };
        
        DefNode.prototype = {

            doGenerateCode: function(template) {
                
                var func = this.getProperty("function");
                
                if (!func) {
                    this.addError('"function" attribute is required');
                    this.generateCodeForChildren(template);
                    return;
                }
                
                func = strings.trim(func);
                
                var matches = funcDefRegExp.exec(func);
                if (matches) {
                    var name = matches[1];
                    var params = matches[2] ? matches[2].split(/\s*,\s*/) : [];

                    var definedFunctions = template.getAttribute("core:definedFunctions");
                    if (!definedFunctions) {
                        definedFunctions = template.setAttribute("core:definedFunctions", {});
                    }
                    
                    definedFunctions[name] = {
                        params: params,
                        bodyParam: this.getProperty("bodyParam")
                    };
                }
                else {
                    this.addError('Invalid function name of "' + func + '"');
                    this.generateCodeForChildren(template);
                    return;
                }
                
                template
                    .statement('function ' + func + ' {')
                    .indent(function() {
                        template
                            .line('return context.c(function() {')
                            .indent(function() {
                                this.generateCodeForChildren(template);
                            }, this)
                            .line('});');
                    }, this)
                    .line('}');
            }
            
        };
        
        return DefNode;
    });