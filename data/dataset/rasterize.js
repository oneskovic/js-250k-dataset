// Get command-line argument(s)
var system = require('system');
var sourceUrl = system.args[1];

// Load the source of requests.
var requestPage = require('webpage').create();

// Returns the time elapsed since the last call to this function.
var elapsed = (function() {
	var tzero = new Date().getTime();
	
	return function () {
		var mark = new Date().getTime();
		var time = mark - tzero;
		tzero = mark;
		return time;
	};
}());

var exportPage,
	url,
	task,
	timeoutTask;

// Does the work of rendering.
function render() {
	console.log('Paused: '+ elapsed());
	exportPage.render(task.filename);
	console.log('Rendered in: '+ elapsed());
	
	// Issue a 'Success" message to indicate to the
	// listening parent process that this task has completed.
	console.log('SUCCESS');
	phantom.clearCookies();

    window.clearTimeout(timeoutTask);	
}

// Called when the page is loaded.
function onLoad(status, immediate) {
	console.log('Loaded in: '+ elapsed());
	
	if (status !== 'success') {
		console.log('LOAD ERROR');
		
		// Release the memory for the captured page.
		exportPage.release();
		exportPage = null;
		
	} else {
		url = task.source;
		if (immediate) {
			render();
		} else {
		    exportPage.onCallback = function(data) {
		        render();
		    }
			timeoutTask = window.setTimeout(render, task.renderDelay);
		}
	}
}

// Process the next request
var renderNext = function(request) {

	// Begin the actual capture task.
	console.log('Task retrieved after '+ elapsed() +' wait.');

	// Convert the request text into a JSON object.
	task = JSON.parse(request);

	if (exportPage && 
		!task.reload && 
		url === task.source && 
		exportPage.viewportSize.width === task.width && 
		exportPage.viewportSize.height === task.height
	) {
		onLoad('success', true);
	} else {
		if (exportPage) {
			exportPage.release();
		}
		url = null;
		exportPage = require('webpage').create();
		exportPage.viewportSize = { width: task.width, height: task.height };
		
		if (task.username !== null && task.password !== null) {
			exportPage.settings.userName = task.username;
			exportPage.settings.password = task.password;
		}

		task.cookies.forEach(function(cookie) {
			phantom.addCookie({
				'name' : cookie.name,
				'value' : cookie.value,
				'domain' : cookie.domain
			});
		});		
		exportPage.open(task.source, onLoad);
	}
	
};

requestPage.onConsoleMessage = function(s) {
	console.log(s);
	
	if (s === '{SHUTDOWN}') {
		phantom.exit();
		
	} else if (s !== '{RECONNECT}'){
		renderNext(s);
	}
};

console.log('Starting capture service...');

// Load the task request page to retrieve the next (if any) task on the queue.
requestPage.open(sourceUrl, function (status) {
	if (status !== 'success') {
		console.log('Unable to retrieve capture task!');
		
	} 
});
