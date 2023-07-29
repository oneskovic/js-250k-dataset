define(
	['lib/module', 'lib/channels'],
	function(modules, chan) {

		var _fileUploadState = {
			subscriberTokens : null,
			iFrame : undefined
		};

		var _onFileUpload = function(eventChannel, data) {
			if(!data.action) return;

			var contentDocument = _fileUploadState.iFrame[0].contentDocument;

			if(data.preCallback) {
				contentDocument.preCallback = data.preCallback;
			}

			if(data.postCallback) {
				contentDocument.postCallback = data.postCallback;
			}
			contentDocument.multiform.action = aperture.io.restUrl(data.action);
			contentDocument.multiform.reset();

			contentDocument.multiform.file.accept = data.filter;
			contentDocument.multiform.file.click();
		};

		var _initializeModule = function() {
			_fileUploadState.iFrame = $('<iframe src="scripts/modules/upload.html" id="ifu" style="display:none">');
			_fileUploadState.iFrame.appendTo('body');
		};

		var fileUploadConstructor = function(){
			return {
				start : function(){
					var subTokens = {};

					// Subscribe to the appropriate calls.
					subTokens[chan.FILE_UPLOAD_REQUEST] = aperture.pubsub.subscribe(chan.FILE_UPLOAD_REQUEST, _onFileUpload);
					subTokens[chan.ALL_MODULES_STARTED] = aperture.pubsub.subscribe(chan.ALL_MODULES_STARTED, _initializeModule);
					_fileUploadState.subscriberTokens = subTokens;
				},
				end : function(){
					for (var token in _fileUploadState.subscriberTokens) {
						if (_fileUploadState.subscriberTokens.hasOwnProperty(token)) {
							aperture.pubsub.unsubscribe(_fileUploadState.subscriberTokens[token]);
						}
					}
				}
			};
		};

		// Register the module with the system
		modules.register('xfFileUpload', fileUploadConstructor);
		return {
		};
	}
);