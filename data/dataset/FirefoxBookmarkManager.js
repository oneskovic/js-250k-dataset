if(!com) { var com = {} }
if(!com.BlankCanvas) { com.BlankCanvas = {} }

com.BlankCanvas.FirefoxBookmarkManager = {
	service:Components.classes["@mozilla.org/browser/nav-bookmarks-service;1"].getService(Components.interfaces.nsINavBookmarksService),
	create:function(url, title, folder) {
		try {
			var bmsvc = com.BlankCanvas.FirefoxBookmarkManager.service;
			var ios = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
			var uri = ios.newURI(url, null, null);
			var newFolderId = typeof(folder) == 'undefined' ? bmsvc.bookmarksMenuFolder : folder;
			var newBkmkId = bmsvc.insertBookmark(newFolderId, uri, bmsvc.DEFAULT_INDEX, title);
			return newBkmkId;
		} catch(e) {
			alert(e);
			//com.BlankCanvas.GmailSignatures.debug(e, 'com.BlankCanvas.FirefoxBookmarkManager.create()');
		}		
	},
	getByUrl:function(url) {
		try {
			var bmsvc = com.BlankCanvas.FirefoxBookmarkManager.service;
			var ios = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
			var uri = ios.newURI(url, null, null);
			var bookmarksArray = bmsvc.getBookmarkIdsForURI(uri, {});
			return bookmarksArray;
		} catch(e) {
			alert(e);
		}
	},
	getKeyword:function(bookmarkId) {
		var bmsvc = com.BlankCanvas.FirefoxBookmarkManager.service;
		return bmsvc.getKeywordForBookmark(bookmarkId);
	},
	getTitle:function(bookmarkId) {
		var bmsvc = com.BlankCanvas.FirefoxBookmarkManager.service;
		return bmsvc.getItemTitle(bookmarkId);
	},
	setKeyword:function(bookmarkId, keyword) {
		var bmsvc = com.BlankCanvas.FirefoxBookmarkManager.service;
		bmsvc.setKeywordForBookmark(bookmarkId, keyword);
	},
	setTitle:function(bookmarkId, keyword) {
		var bmsvc = com.BlankCanvas.FirefoxBookmarkManager.service;
		bmsvc.setItemTitle(bookmarkId, keyword);
	}
	
}