function utemplate(template, model, onChange) {
  return template
    // {{#section}} sectionBody {{/}}
    .replace(
      /\{\{#([\w\.\-]+)\}\}(.+?)\{\{\/([\w\.\-]*?)\}\}/g,
      function(match, openTag, body, closeTag, pos) {
        if (closeTag !== '' && closeTag !== openTag) {
          throw 'jtmpl: Unclosed ' + openTag;
        }
        if (typeof onChange === 'function') {
          model.on('change', openTag, onChange);
        }
        var val = openTag === '.' ? model : model(openTag);
        return (typeof val === 'function' && val.len !== undefined) ?
            // Array
            (val.len > 0) ?
              // Non-empty
              val.values
                .map(function(el, i) {
                  return utemplate(body.replace(/\{\{\.\}\}/g, '{{' + i + '}}'), val, onChange);
                })
                .join('') :
              // Empty
              '' :
            // Object or boolean?
            (typeof val === 'function' && val.len === undefined) ?
              // Object
              utemplate(body, val, onChange) :
              // Cast to boolean
              (!!val) ?
                utemplate(body, model, onChange) :
                '';
      }
    )
    // {{^inverted_section}} sectionBody {{/}}
    .replace(
      /\{\{\^([\w\.\-]+)\}\}(.+?)\{\{\/([\w\.\-]*?)\}\}/g,
      function(match, openTag, body, closeTag, pos) {
        if (closeTag !== '' && closeTag !== openTag) {
          throw 'jtmpl: Unclosed ' + openTag;
        }
        if (typeof onChange === 'function') {
          model.on('change', openTag, onChange);
        }
        var val = openTag === '.' ? model : model(openTag);
        return (typeof val === 'function' && val.len !== undefined) ?
            // Array
            (val.len === 0) ?
              // Empty
              utemplate(body, model, onChange) :
              // Non-empty
              '' :
            // Cast to boolean
            (!val) ?
              utemplate(body, model, onChange) :
              '';
      }
    )
    // {{variable}}
    .replace(
      /\{\{([\w\.\-]+)\}\}/g,
      function(match, variable, pos) {
        if (typeof onChange === 'function') {
          model.on('change', variable, onChange);
        }
        return model(variable) === undefined ? '' : model(variable) + '';
      }
    );
}



module.exports = utemplate;
