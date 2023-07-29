// filepicker (async)
function pickFile() {
	Invoke.utils.filePicker(function(path) {
			Toast.regular('Picked: ' + path, 3000);
		},

		function(reason) {
			Toast.regular('Card canceled: ' + reason);
		},

		function(error) {
			console.log(error);
		});
}

// camera (async)
function takePhoto() {
	Invoke.utils.camera(function(path) {
			Toast.regular('Photo: ' + path, 3000);
		},

		function(reason) {
			Toast.regular('Card canceled: ' + reason);
		},

		function(error) {
			console.log(error);
		});
}

// sample toast button callback
function toastCallback() {
	alert('You are in the toast call back function...');
}

// spinner usage
function spinner(size) {
	Toast.regular('Hiding spinner in 3 seconds...', 2000);
	eval('Spinner.on.' + size + '();');

	setTimeout(function() {
		Spinner.off(size);
	}, 2500);
}

// show a welcome message
function welcome() {
Toast.regular('Welcome to the Sencha Touch Sample!', 2000);
setTimeout(function(){
	Toast.regular('Swipe down to see the Application Menu!', 2000);
	setTimeout(function(){
		Toast.regular('Minimize the app to see the Window Cover', 2300);
}, 2300);
}, 2300);
}


