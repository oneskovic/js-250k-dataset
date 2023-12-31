/*eslint-env browser, amd*/
define([], function() {

	/*
	 * FILE: targetPattern represents a workspace path
	 * API: targetPattern represents a URL on this server
	 */
	var FILE = 0, API = 1;
	// This is kind of clumsy because API paths aren't followed by / but FILE paths are..
	var SELF_HOSTING_TEMPLATE = [
		{ type: FILE, source: "/", targetPattern: "${0}/bundles/org.eclipse.orion.client.ui/web/index.html" },
		{ type: FILE, source: "/", targetPattern: "${0}/bundles/org.eclipse.orion.client.ui/web" },
		{ type: FILE, source: "/", targetPattern: "${0}/bundles/org.eclipse.orion.client.help/web" },
		{ type: FILE, source: "/", targetPattern: "${0}/bundles/org.eclipse.orion.client.users/web" },
		{ type: FILE, source: "/", targetPattern: "${0}/bundles/org.eclipse.orion.client.core/web" },
		{ type: FILE, source: "/", targetPattern: "${0}/bundles/org.eclipse.orion.client.editor/web" },
		{ type: FILE, source: "/", targetPattern: "${0}/bundles/org.eclipse.orion.client.cf/web" },
		{ type: FILE, source: "/", targetPattern: "${0}/bundles/org.eclipse.orion.client.git/web" },
		{ type: FILE, source: "/", targetPattern: "${0}/bundles/org.eclipse.orion.client.javascript/web" },
		{ type: FILE, source: "/", targetPattern: "${0}/bundles/org.eclipse.orion.client.webtools/web" },
		{ type: API, source: "/file", targetPattern: "${0}file" },
		{ type: API, source: "/prefs", targetPattern: "${0}prefs" },
		{ type: API, source: "/workspace", targetPattern: "${0}workspace" },
		{ type: API, source: "/users", targetPattern: "${0}users" },
		{ type: API, source: "/authenticationPlugin.html", targetPattern: "${0}authenticationPlugin.html" },
		{ type: API, source: "/login", targetPattern: "${0}login" },
		{ type: API, source: "/loginstatic", targetPattern: "${0}loginstatic" },
		{ type: API, source: "/useremailconfirmation", targetPattern: "${0}useremailconfirmation" },
		{ type: API, source: "/site", targetPattern: "${0}site" },
		{ type: API, source: "/gitapi", targetPattern: "${0}gitapi" },
		{ type: API, source: "/xfer", targetPattern: "${0}xfer" },
		{ type: API, source: "/filesearch", targetPattern: "${0}filesearch" },
		{ type: API, source: "/index.jsp", targetPattern: "${0}index.jsp" },
		{ type: API, source: "/plugins/git", targetPattern: "${0}plugins/git" },
		{ type: API, source: "/plugins/user", targetPattern: "${0}plugins/user" },
		{ type: API, source: "/logout", targetPattern: "${0}logout" },
		{ type: API, source: "/task", targetPattern: "${0}task" },
		{ type: API, source: "/cfapi", targetPattern: "${0}cfapi" },
		{ type: API, source: "/metrics", targetPattern: "${0}metrics" },
	];

	return {
		Rules: SELF_HOSTING_TEMPLATE,
		Types: {
			File: FILE,
			API: API
		}
	};
});