define(['explorer/widgets/editorarea/EditorToolbar', 'dojo/query', 'dojo/dom-class',
  'dojo/NodeList-manipulate', 'dojo/NodeList-dom'], function(EditorToolbar, query, domClass){
  describe('An EditorToolbar widget', function() {
    var editorArea;
    beforeEach(function() {
      var div = document.createElement("div");
      div.style.display = 'none';
      div.id = 'testDiv';
      document.body.appendChild(div);
    });
  
    afterEach(function() {
      document.body.removeChild(document.getElementById('testDiv'));
    });

    it("can respond to a render gadget click", function() {
      var editorToolbar = new EditorToolbar();
      spyOn(editorToolbar, "emit").andCallThrough();
      document.getElementById('testDiv').appendChild(editorToolbar.domNode);
      editorToolbar.renderGadgetButton.click();
      expect(editorToolbar.emit).toHaveBeenCalledWith("renderGadgetClick");
      editorToolbar.destroy();
    });

    it("can respond to a render ee gadget click", function() {
      var editorToolbar = new EditorToolbar();
      spyOn(editorToolbar, "emit").andCallThrough();
      document.getElementById('testDiv').appendChild(editorToolbar.domNode);
      editorToolbar.renderEEButton.click();
      expect(editorToolbar.emit).toHaveBeenCalledWith("renderEEClick");
      editorToolbar.destroy();
    });

    it('can set the title in the editor toolbar', function() {
      var editorToolbar = new EditorToolbar();
      document.getElementById('testDiv').appendChild(editorToolbar.domNode);
      editorToolbar.setTitle('testing');
      expect(query('.brand', this.domNode)[0].innerHTML).toEqual('testing');
      editorToolbar.destroy();
    });

    it('can show and hide the embedded experiences button', function() {
      var editorToolbar = new EditorToolbar();
      document.getElementById('testDiv').appendChild(editorToolbar.domNode);
      editorToolbar.showRenderEEButton();
      expect(domClass.contains(editorToolbar.renderEEButton, 'hide')).toEqual(false);
      editorToolbar.hideRenderEEButton();
      expect(domClass.contains(editorToolbar.renderEEButton, 'hide')).toEqual(true);
      editorToolbar.destroy();
    })
  });
});