(function(wysihtml5){
  wysihtml5.commands.formatCode = {

    exec: function(composer, command, classname) {
      var pre = this.state(composer),
          code, range, selectedNodes;
      if (pre) {
        // caret is already within a <pre><code>...</code></pre>
        composer.selection.executeAndRestore(function() {
          code = pre.querySelector("code");
          wysihtml5.dom.replaceWithChildNodes(pre);
          if (code) {
            wysihtml5.dom.replaceWithChildNodes(code);
          }
        });
      } else {
        // Wrap in <pre><code>...</code></pre>
        range = composer.selection.getRange();
        selectedNodes = range.extractContents();
        pre = composer.doc.createElement("pre");
        code = composer.doc.createElement("code");

        if (classname) {
          code.className = classname;
        }

        pre.appendChild(code);
        code.appendChild(selectedNodes);
        range.insertNode(pre);
        composer.selection.selectNode(pre);
      }
    },

    state: function(composer) {
      var selectedNode = composer.selection.getSelectedNode();
      if (selectedNode && selectedNode.nodeName && selectedNode.nodeName == "PRE"&&
          selectedNode.firstChild && selectedNode.firstChild.nodeName && selectedNode.firstChild.nodeName == "CODE") {
        return selectedNode;
      } else {
        return wysihtml5.dom.getParentElement(selectedNode, { query: "pre code" });
      }
    }
  };
}(wysihtml5));
