puredom.net.multiLoad = function(resources, callback) {
	if (!resources) {
		return false;
	}
	var cur = -1,
		max = resources.length,
		allData = [],
		trues = 0,
		falses = 0,
		loaded, loadNext;
	
	/** @inner */
	loaded = function(result, data) {
		if (result && data) {
			var res = resources[cur],
				d = data;
			if (res.process && res.process.call) {
				d = res.process(d);
				if (d===undefined) {
					d = data;
				}
			}
			allData.push(d);
			if (callback) {
				callback(trues>0, allData, trues, falses);
			}
			loaded = loadNext = resources = allData = callback = null;
		}
		else {
			loadNext();
		}
	};
	
	/** @inner */
	loadNext = function() {
		cur += 1;
		var res = resources[cur],
			d = typeof res==='string' ? {url:res} : res;
		if (d) {
			http.request(d, loaded);
		}
		else {
			if (cur<max) {
				loadNext();
			}
			else {
				callback(false, null, null, "No resources were available.");
			}
		}
	};
	
	loadNext();
	
	return true;
};