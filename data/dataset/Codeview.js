define([
  'summernote/core/agent',
  'summernote/core/dom'
], function (agent, dom) {

  var CodeMirror;
  if (agent.hasCodeMirror) {
    if (agent.isSupportAmd) {
      require(['CodeMirror'], function (cm) {
        CodeMirror = cm;
      });
    } else {
      CodeMirror = window.CodeMirror;
    }
  }

  
  var Codeview = function (handler) {

    this.sync = function (layoutInfo) {
      var isCodeview = handler.invoke('codeview.isActivated', layoutInfo);
      if (isCodeview && agent.hasCodeMirror) {
        layoutInfo.codable().data('cmEditor').save();
      }
    };

    /**
     * @param {Object} layoutInfo
     * @return {Boolean}
     */
    this.isActivated = function (layoutInfo) {
      var $editor = layoutInfo.editor();
      return $editor.hasClass('codeview');
    };

    /**
     * toggle codeview
     *
     * @param {Object} layoutInfo
     */
    this.toggle = function (layoutInfo) {
      if (this.isActivated(layoutInfo)) {
        this.deactivate(layoutInfo);
      } else {
        this.activate(layoutInfo);
      }
    };

    /**
     * activate code view
     *
     * @param {Object} layoutInfo
     */
    this.activate = function (layoutInfo) {
      var $editor = layoutInfo.editor(),
          $toolbar = layoutInfo.toolbar(),
          $editable = layoutInfo.editable(),
          $codable = layoutInfo.codable(),
          $popover = layoutInfo.popover(),
          $handle = layoutInfo.handle();

      var options = $editor.data('options');

      $codable.val(dom.html($editable, options.prettifyHtml));
      $codable.height($editable.height());

      handler.invoke('toolbar.updateCodeview', $toolbar, true);
      handler.invoke('popover.hide', $popover);
      handler.invoke('handle.hide', $handle);

      $editor.addClass('codeview');

      $codable.focus();

      // activate CodeMirror as codable
      if (agent.hasCodeMirror) {
        var cmEditor = CodeMirror.fromTextArea($codable[0], options.codemirror);

        // CodeMirror TernServer
        if (options.codemirror.tern) {
          var server = new CodeMirror.TernServer(options.codemirror.tern);
          cmEditor.ternServer = server;
          cmEditor.on('cursorActivity', function (cm) {
            server.updateArgHints(cm);
          });
        }

        // CodeMirror hasn't Padding.
        cmEditor.setSize(null, $editable.outerHeight());
        $codable.data('cmEditor', cmEditor);
      }
    };

    /**
     * deactivate code view
     *
     * @param {Object} layoutInfo
     */
    this.deactivate = function (layoutInfo) {
      var $editor = layoutInfo.editor(),
          $toolbar = layoutInfo.toolbar(),
          $editable = layoutInfo.editable(),
          $codable = layoutInfo.codable();

      var options = $editor.data('options');

      // deactivate CodeMirror as codable
      if (agent.hasCodeMirror) {
        var cmEditor = $codable.data('cmEditor');
        $codable.val(cmEditor.getValue());
        cmEditor.toTextArea();
      }

      $editable.html(dom.value($codable, options.prettifyHtml) || dom.emptyPara);
      $editable.height(options.height ? $codable.height() : 'auto');
      $editor.removeClass('codeview');

      $editable.focus();

      handler.invoke('toolbar.updateCodeview', $toolbar, false);
    };
  };

  return Codeview;
});
