function extractSourceSpans(node) {
  var nocode = /(?:^|\s)nocode(?:\s|$)/;

  var chunks = [];
  var length = 0;
  var spans = [];
  var k = 0;

  var whitespace;
  if (node.currentStyle) {
    whitespace = node.currentStyle.whiteSpace;
  } else if (window.getComputedStyle) {
    whitespace = document.defaultView.getComputedStyle(node, null)
        .getPropertyValue('white-space');
  }
  var isPreformatted = whitespace && 'pre' === whitespace.substring(0, 3);

  function walk(node) {
    switch (node.nodeType) {
      case 1:  // Element
        if (nocode.test(node.className)) { return; }
        for (var child = node.firstChild; child; child = child.nextSibling) {
          walk(child);
        }
        var nodeName = node.nodeName;
        if ('BR' === nodeName || 'LI' === nodeName) {
          chunks[k] = '\n';
          spans[k << 1] = length++;
          spans[(k++ << 1) | 1] = node;
        }
        break;
      case 3: case 4:  // Text
        var text = node.nodeValue;
        if (text.length) {
          if (!isPreformatted) {
            text = text.replace(/[ \t\r\n]+/g, ' ');
          } else {
            text = text.replace(/\r\n?/g, '\n');  // Normalize newlines.
          }
          // TODO: handle tabs here?
          chunks[k] = text;
          spans[k << 1] = length;
          length += text.length;
          spans[(k++ << 1) | 1] = node;
        }
        break;
    }
  }

  walk(node);

  return {
    sourceCode: chunks.join('').replace(/\n$/, ''),
    spans: spans
  };
}
