var Imgur = Backbone.View.extend({

	disable: function(){ this.isDisabled = true; },
	enable: function(){ this.isDisabled = false; },

	defaultOpts: {
		dropEl: null, // defaults to `this.el`
		apiURL: 'https://api.imgur.com/3/image',
		imgurClientID: 'eae3f1705c4b525' //Get yout Client ID here: http://api.imgur.com/
	},

	initialize: function(opts){

		this.options = _.extend(this.defaultOpts, opts||{});

		this.$el.addClass('imgur-upload-allowed');

		var dropEl = this.options.dropEl || this.el;

		dropEl.addEventListener('dragover', this.onDragOver.bind(this), false);
		dropEl.addEventListener('dragleave', this.onDragLeave.bind(this), false);
		dropEl.addEventListener('drop', this.onDrop.bind(this), false);
	},

	onDragOver: function(){
		if( !this.isDisabled )
			this.$el.addClass('drag-over')
	},

	onDragLeave: function(){
		this.$el.removeClass('drag-over')
	},

	onDrop: function(e){

		this.onDragLeave();

		if( this.isDisabled ) return;

		e.preventDefault(); // stops the browser from redirecting off to the image.

		var dt    = e.dataTransfer;
		var files = dt.files;
		
		for (var i=0; i<files.length; i++) {

			var file = files[i];
			var reader = new FileReader();

			window.reader = reader;

			this.upload(file);
		}
		
		return false;
	},

	upload: function(file){

		if( !file.type.match(/image.*/) ){
			Modal.alert('Invalid Attachment', 'Only images are allowed to be uploaded');
			return;
		}

		var xhttp    = new XMLHttpRequest(),
			self     = this,
			fd       = new FormData();

		Modal.spinner();

		fd.append('image', file);
		xhttp.open('POST', this.options.apiURL);
		xhttp.setRequestHeader('Authorization', 'Client-ID '+this.options.imgurClientID);
		xhttp.onreadystatechange = function () {

			if (xhttp.status === 200 && xhttp.readyState === 4) {
				var resp = JSON.parse(xhttp.responseText);
				self.uploadSuccess(file, resp, xhttp);

			}else if( xhttp.readyState === 4 ){
				this.uploadFailed(file, resp, xhttp);
			}
		};
		xhttp.send(fd);
	},

	uploadSuccess: function(file, resp, xhttp){
		Modal.spinner(false);
		this.trigger('upload:success', resp, file, xhttp)
	},

	uploadFailed: function(file, resp, xhttp){
		Modal.spinner(false);
		Modal.alert('Upload Unsuccessful');
		this.trigger('upload:fail', resp, file, xhttp)
	}

})