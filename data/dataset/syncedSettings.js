/**
 * @namespace
 */
Zotero.SyncedSettings = (function () {
	//
	// Public methods
	//
	var module = {
		get: function (libraryID, setting) {
			return Q.fcall(function () {
				var sql = "SELECT value FROM syncedSettings WHERE setting=? AND libraryID=?";
				return JSON.parse(Zotero.DB.valueQuery(sql, [setting, libraryID]));
			});
		},
		
		
		set: function (libraryID, setting, value, version, synced) {
			var self = this;
			return Q.fcall(function () {
				return self.setSynchronous(libraryID, setting, value, version, synced);
			});
		},
		
		
		setSynchronous: function (libraryID, setting, value, version, synced) {
			// TODO: get rid of this once we have proper affected rows handling
			var sql = "SELECT value FROM syncedSettings WHERE setting=? AND libraryID=?";
			var currentValue = Zotero.DB.valueQuery(sql, [setting, libraryID]);
			
			// Make sure we can tell the difference between a
			// missing setting (FALSE as returned by valueQuery())
			// and a FALSE setting (FALSE as returned by JSON.parse())
			var hasCurrentValue = currentValue !== false;
			var hasValue = typeof value != 'undefined';
			
			currentValue = JSON.parse(currentValue);
			
			if ((!hasCurrentValue && !hasValue) || value === currentValue) {
				return false;
			}
			
			var id = libraryID + '/' + setting;
			
			if (hasCurrentValue) {
				var extraData = {};
				extraData[id] = {
					changed: {}
				};
				extraData[id].changed = {
					value: currentValue
				};
			}
			
			// Clear
			if (typeof value == 'undefined') {
				var sql = "DELETE FROM syncedSettings WHERE setting=? AND libraryID=?";
				Zotero.DB.query(sql, [setting, libraryID]);
				
				Zotero.Notifier.trigger('delete', 'setting', [id], extraData);
				return true;
			}
			
			// Set/update
			
			if (currentValue === false) {
				var event = 'add';
				var extraData = {};
			}
			else {
				var event = 'modify';
			}
			
			synced = synced ? 1 : 0;
			
			if (hasCurrentValue) {
				var sql = "UPDATE syncedSettings SET value=?, synced=? WHERE setting=? AND libraryID=?";
				Zotero.DB.query(sql, [JSON.stringify(value), synced, setting, libraryID]);
			}
			else {
				var sql = "INSERT INTO syncedSettings "
					+ "(setting, libraryID, value, synced) VALUES (?, ?, ?, ?)";
				Zotero.DB.query(sql, [setting, libraryID, JSON.stringify(value), synced]);
			}
			Zotero.Notifier.trigger(event, 'setting', [id], extraData);
			return true;
		}
	};
	
	return module;
}());
