var InlineEditorGroup = {
	components: [],

	InlineEditor : function(el, options) {
		this.components.push(new InlineEditor(el, options));
	},

	Combo : function(el, options) {
		this.components.push(new InlineEditor.Combo(el, options));
	},

	Textarea: function(el, options) {
		this.components.push(new InlineEditor(el, options))
	},

	// Retrieves the query string version of the id:value pairs of the grouped
	// inline editors.
	toQueryString: function() {
		return Object.toQueryString(this.toObject());
	},

	// Retrives and object containing the id:value pairs of the grouped
	// inline editors.
	toObject: function() {
		var result = {}
		this.components.each(function(editor) {
			result = Object.merge(result, editor.getValue());
		});

		return result;
	}
};