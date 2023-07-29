define.Class(
    'raptor/templating/taglibs/core/ElseIfNode',
    'raptor/templating/compiler/ElementNode',
    ['raptor'],
    function(raptor, require) {
        'use strict';
        
        var ElseIfNode = function(props) {
            ElseIfNode.superclass.constructor.call(this, "http://raptorjs.org/templates/core", "else-if", "c");
            if (props) {
                this.setProperties(props);
            }
        };
        
        ElseIfNode.prototype = {
            doGenerateCode: function(template) {
                var test = this.getProperty("test");
                
                if (!test) {
                    this.addError('"test" attribute is required');
                    return;
                }

                template
                    .line('else if (' + test + ') {')
                    .indent(function() {
                            this.generateCodeForChildren(template);    
                    }, this)
                    .line('}');
                
            }
            
        };
        
        return ElseIfNode;
    });