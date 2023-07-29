MooEditr.Actions.Settings.pagebreak = {
	imageFile: '../../Assets/MooEditr/Other/pagebreak.gif'
};

MooEditr.lang.set({
	pageBreak: 'Page break'
});


MooEditr.Actions.pagebreak = {
	
	title: MooEditr.lang.get('pageBreak'),
	command: function(){
		this.selection.insertContent('<img class="MooEditr-visual-aid MooEditr-pagebreak">');
	},
	events: {
		beforeToggleView: function(){ // code to run when switching from iframe to textarea
			if (this.mode == 'iframe'){
				var s = this.getContent().replace(/<img([^>]*)class="MooEditr-visual-aid MooEditr-pagebreak"([^>]*)>/gi, '<!-- page break -->');
				this.setContent(s);
			} else {
				var s = this.textarea.get('value').replace(/<!-- page break -->/gi, '<img class="MooEditr-visual-aid MooEditr-pagebreak">');
				this.textarea.set('value', s);
			}
		},
		render: function(){
			this.options.extraCSS = 'img.MooEditr-pagebreak { display:block; width:100%; height:16px; background: url('
				+ MooEditr.Actions.Settings.pagebreak.imageFile + ') repeat-x; }'
				+ this.options.extraCSS;
		}
	}
};