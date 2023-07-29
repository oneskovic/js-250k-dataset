(function(){
	
	// still too early, seems nobody has implemented w/o and proprietary prefix yet.
	var indexedDB = window.mozIndexedDB || (window["ActiveXObject"] && new ActiveXObject("SQLCE.Factory.4.0")) || {};
	
	//var db;
	var store;
	var storeName = "store1";
	var autoIncrement = false;
	var keyPath = "id";
	var dbVersion = "1";
	
	dohx.add({name:"Basic tests",
		mqcExecutionOrderBaseOffset:700000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				id:100,
				summary:"Is indexedDB available?",
				test:function(t){
					t.assertTrue("mozIndexedDB" in window);
				}
			},
			{
				id:200,
				summary:"Open a DB",
				dependsOn:[100],
				test:function(t){
					var openRequest = indexedDB.open('_test', "test");
					openRequest.onsuccess = function(event){
						db = event.target.result;
						t.success("Got a handle ", db);
					};
					openRequest.onerror = function(){
						t.failure("onerror called");
					}
				}
			},
			{
				id:300,
				summary:"Verify db is an instance of indexedDB",
				dependsOn:[200],
				test:function(t){
					t.assertTrue(db instanceof IDBDatabase);
				}
			},
			{
				id:400,
				summary:"setVersion()",
				dependsOn:[300],
				test:function(t){
					var versionRequest = db.setVersion(dbVersion);
					versionRequest.onerror = function(e){
						t.failure(e);
					};
					versionRequest.onsuccess = function(e){
						t.success(true);
					};
				}
			},
			{
				id:500,
				summary:"createObjectStore",
				dependsOn:[400],
				test:function(t){
					store = db.createObjectStore(storeName, {keyPath: keyPath, autoIncrement: autoIncrement});
					t.success(true);
				}
			},
			{
				id:600,
				summary:"objectStoreNames.contains()",
				dependsOn:[500],
				test:function(t){
					t.assertTrue(db.objectStoreNames.contains(storeName));
				}
			},
			{
				id:700,
				summary:"createObjectStore",
				dependsOn:[600],
				test:function(t){
					var emptyTransaction = db.transaction([], IDBTransaction.READ_ONLY, 0);
					store = emptyTransaction.objectStore(storeName);
				}
			},
			//{
			//	id:200,
			//	name:"Is indexedDB implemented?",
			//	dependsOn:[100],
			//	test:function(t){
			//		
			//		var openRequest = mozIndexedDB.open('_test', "test");
			//		openRequest.onsuccess = function(event){
			//			var db = event.target.result;
			//			var versionRequest = db.setVersion(dbVersion);
			//			versionRequest.onerror = function(e){
			//				t.failure(e);
			//			}
			//			versionRequest.onsuccess = function(){
			//				if (db.objectStoreNames.contains(storeName)){
			//					var emptyTransaction = db.transaction([], IDBTransaction.READ_ONLY, 0);
			//					var store = emptyTransaction.objectStore(storeName);
			//				} else {
			//					var store = db.createObjectStore(storeName, {keyPath: keyPath, autoIncrement: autoIncrement});
			//				}
			//				
			//				var putTransaction = db.transaction([storeName], IDBTransaction.READ_WRITE);
			//				var putRequest = putTransaction.objectStore(storeName).put({id:1, name:"zwei"});
			//				putRequest.onsuccess = function(){
			//					t.success("jut");
			//				};
			//				putRequest.onerror = function(e){
			//					t.failure(e);
			//				}
			//			}
			//		};
			//	}
			//}
//*/
		]
	});
})();
