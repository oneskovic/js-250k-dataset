var Concrete = {
  Version: '0.1.0',
  require: function(r) {
    document.write('<script type="text/javascript" src="'+r+'"><\/script>');
  },
  load: function() {
    // TODO: check prototype and scriptaculous version
    var js = /concrete\.js(\?.*)?$/;
    $$('head script[src]').findAll(function(s) {
      return s.src.match(js);
    }).each(function(s) {
      var path = s.src.replace(js, '');
      [
        'editor',
        'selector',
        'scroller',
        'element_extension',
        'basic_inline_editor',
        'inline_editor',
        'template_provider',
        'model_interface',
        'metamodel_provider',
        'identifier_provider',
        'external_identifier_provider',
        'constraint_checker',
        'clipboard',
        'helper'
      ].each( function(include) { 
        Concrete.require(path + include + '.js');
      });
    });
  }
};

Concrete.load();
