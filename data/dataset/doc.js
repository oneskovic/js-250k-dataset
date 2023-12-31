var convert_anchor, convert_code, date, docs, each, fs, getindent, mecano, path, unindent;

fs = require('fs');

path = require('path');

mecano = require('mecano');

each = require('each');

date = function() {
  var d;
  return d = (new Date).toISOString();
};

/*
Find indentation based on the first line containing text
*/


getindent = function(text) {
  var line, _i, _len;
  if (!Array.isArray(text)) {
    text = text.split('\n');
  }
  for (_i = 0, _len = text.length; _i < _len; _i++) {
    line = text[_i];
    if (line.trim()) {
      return /(\s*)/.exec(line)[0];
    }
  }
  return '';
};

/*
Discover indentation in first line and remove it for every other lines
*/


unindent = function(lines) {
  var indent;
  lines = lines.split('\n');
  indent = getindent(lines);
  lines = lines.map(function(line) {
    return line.substr(indent.length);
  });
  return lines.join('\n');
};

/*
Create an anchor from the function name in the title
*/


convert_anchor = function(text) {
  var re_anchor;
  re_anchor = /`([\w.]+)\(/g;
  return text.replace(re_anchor, function(str, code) {
    return "<a name=\"" + code + "\"></a>\n`" + code + "(";
  });
};

convert_code = function(text) {
  var re_code;
  re_code = /\n(\s{4}\s*?\S[\s\S]*?)\n(?!\s)/g;
  return text.replace(re_code, function(str, code) {
    code = code.split('\n').map(function(line) {
      return line.substr(4);
    }).join('\n');
    return "\n\n```javascript\n" + code + "\n```\n\n";
  });
};

docs = ['index', 'from', 'to', 'transformer', 'parser', 'stringifier'];

each(docs).parallel(true).on('item', function(file, next) {
  var destination, source;
  source = "" + __dirname + "/" + file + ".coffee";
  destination = "" + __dirname + "/../doc/" + file + ".md";
  return fs.readFile(source, 'ascii', function(err, text) {
    var content, match, re, re_title, title;
    if (err) {
      return console.error(err);
    }
    re = /###(.*)\n([\s\S]*?)\n( *)###/g;
    re_title = /([\s\S]+)\n={2}=+([\s\S]*)/g;
    match = re.exec(text);
    match = re_title.exec(match[2]);
    title = match[1].trim();
    content = match[2];
    content = unindent(content);
    content = convert_code(content);
    docs = "---\nlanguage: en\nlayout: page\ntitle: \"" + title + "\"\ndate: " + (date()) + "\ncomments: false\nsharing: false\nfooter: false\nnavigation: csv\ngithub: https://github.com/wdavidw/node-csv\nsource: ./" + (path.relative(__dirname + '/../', source)) + "\n---\n" + content;
    while (match = re.exec(text)) {
      if (match[1]) {
        continue;
      }
      match[2] = unindent(match[2]);
      docs += convert_code(convert_anchor(match[2]));
      docs += '\n';
    }
    return fs.writeFile(destination, docs, next);
  });
}).on('both', function(err) {
  var destination;
  if (err) {
    return console.error(err);
  }
  console.log('Documentation generated');
  destination = process.argv[2];
  if (!destination) {
    return;
  }
  return each().files("" + __dirname + "/../doc/*.md").on('item', function(file, next) {
    return mecano.copy({
      source: file,
      destination: destination,
      force: true
    }, next);
  }).on('both', function(err) {
    if (err) {
      return console.error(err);
    }
    return console.log("Documentation published: " + destination);
  });
});
