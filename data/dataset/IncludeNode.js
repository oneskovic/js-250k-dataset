define.Class(
    'raptor/templating/taglibs/core/IncludeNode',
    'raptor/templating/compiler/Node',
    ['raptor'],
    function(raptor, require) {
        'use strict';
        
        var stringify = require('raptor/json/stringify'),
            extend = raptor.extend;
        
        var IncludeNode = function(props) {
            IncludeNode.superclass.constructor.call(this);
            if (props) {
                this.setProperties(props);
            }
        };

        IncludeNode.convertNode = function(node, template) {
            extend(node, IncludeNode.prototype);
            IncludeNode.call(node);

            node.setProperty("template", stringify(template));
        };
        
        IncludeNode.prototype = {
            doGenerateCode: function(template) {
                var templateName = this.getProperty("template"),
                    templateData = this.getProperty("templateData") || this.getProperty("template-data"),
                    resourcePath,
                    _this = this;
                
                if (templateName) {
                    this.removeProperty("template");
                    var dataExpression;
                    
                    if (templateData) {
                        dataExpression = templateData;
                    }
                    else {


                        dataExpression = {
                            toString: function() {
                                var propParts = [];
                        
                                _this.forEachPropertyNS('', function(name, value) {
                                    name = name.replace(/-([a-z])/g, function(match, lower) {
                                        return lower.toUpperCase();
                                    });

                                    propParts.push(stringify(name) + ": " + value);
                                }, _this);
                                
                                if (_this.hasChildren()) {
                                    propParts.push(stringify("invokeBody") + ": " +  _this.getBodyContentFunctionExpression(template, false));
                                }

                                return "{" + propParts.join(", ") + "}";
                            }
                        };
                    }
                    
                    
                    template.include(templateName, dataExpression);
                    
                }
                else if ((resourcePath = this.getAttribute("resource"))) {
                    var isStatic = this.getProperty("static") !== false;
                    if (isStatic) {
                        var resource = require('raptor/resources').findResource(resourcePath);
                        if (!resource.exists()) {
                            this.addError('"each" attribute is required');
                            return;
                        }
                        
                        template.write(stringify(resource.readAsString()));
                    }
                }
                else {
                    this.addError('"template" or "resource" attribute is required');
                }
            }
            
        };
        
        return IncludeNode;
    });