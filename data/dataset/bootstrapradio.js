(function($) {

        
    $(document).ready(function() {
        $(".bootstrapradio").each(function() {
            var btn_name = $(this).attr("name");
            $.fn._init($(this));
               
            // Set default value
            var selected = $(this).data("selected");
            if (selected) {
                $("button[name='" + btn_name + "'].bootstrapradio-on").removeClass('bootstrapradio-on');
                $(this).addClass('bootstrapradio-on');
                // Store value in corresponding input field
                $( "input[name='" + btn_name + "']").val($(this).val());
            }            
        });
        
        return;
    });    
    
    var methods = {
        init : function(options) {
            options = typeof options !== 'undefined' ? options : {'default': ""};
            $(this).each(function() {
                var btn_name = $(this).attr("name");
                $.fn._init($(this));
                // Set default value
                if ($(this).val() == options['default'] || $(this).attr("data-selected") == "true") {
                    $(this).attr("data-selected", "true");
                    $(this).addClass('bootstrapradio-on');
                    // Store value in corresponding input field
                    $( "input[name='" + btn_name + "']").val($(this).val());
                }
            });            

        },
        value : function( new_val ) {
            var btn_name = this.attr('name');
            if ( typeof new_val === 'undefined' ){
                return $( "input[name='" + btn_name + "']").val();
            } else {
                $("button[name='" + btn_name + "'][value='" + new_val + "']").addClass('bootstrapradio-on');
                return $( "input[name='" + btn_name + "']").val(new_val).trigger('change');
            }
        },
        disabled : function(disabled) {
            var btn_name = this.attr('name');
            if (disabled === true) {
                if ($( "input[name='" + btn_name + "']").val() == $(this).val()) {
                    $( "input[name='" + btn_name + "']").val("").trigger('change');
                    $(this).attr("data-selected", "false");
                    $(this).removeClass('bootstrapradio-on');
                }
            }
            $(this).prop('disabled', disabled);
            return $(this); 
        }
    };        
        
    $.fn.bootstrapradio = function(methodOrOptions) {        
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.bootstrapradio' );
        }    
    };
    
    $.fn._init = function(el){        
        var btn_name = el.attr("name");
        
        // If this is wrapped in a form...
        var form = el.closest("form");
        if (form.length) {
            // Create the input field for this named group, if it doesn't exist
            if (!form.find("input[name='" + btn_name + "'][type='hidden']").length) {
                $( "<input type='hidden' name='" + btn_name + "'>").insertBefore(el);
            }
        } else {
            // Otherwise just look for any hidden input that matches the name
            if (!$("input[name='" + btn_name + "'][type='hidden']").length) {
                $( "<input type='hidden' name='" + btn_name + "'>").insertBefore(el);
            }
        }

        // Apply default classes
        var size = typeof el.attr("data-size") !== 'undefined' ? el.attr("data-size") : "xs";
        
        el.addClass('btn btn-' + size + ' bootstrapradio');
        
        // Attach handler for clicking a choice     
        el.click(function() {
            // Update data-selected
            $("button[name='" + btn_name + "'].bootstrapradio-on").attr("data-selected", "false");
            el.attr("data-selected", "true");          
            $("button[name='" + btn_name + "'].bootstrapradio-on").removeClass('bootstrapradio-on');
            el.addClass('bootstrapradio-on');
            // Store value in corresponding input field
            $( "input[name='" + btn_name + "']").val(el.val()).trigger('change');                  
        });
    };
    
})(jQuery);
