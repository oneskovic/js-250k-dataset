var fun = require("../../../uki-core/function"),
    utils = require("../../../uki-core/utils"),

    storage = require("../../../storage/storage"),

    Ad = require("../../model/ad").Ad;


function migrateWebSql(uid, DB, callback) {
  DB.transaction(function(tx1) {
    tx1.executeSql('SELECT data FROM ' + Ad.tableName(), [],
    function(tx2, r) {
      if (r.rows && r.rows.length && !r.rows.item(0).account_id) {
        var ads = [];
        for (var i = 0; i < r.rows.length; i++) {
          var obj = JSON.parse(r.rows.item(i).data);
          var ad = new Ad();
          ad.fromDBObject(obj)
            .id(obj.id);
          ads.push(ad);
        }
        Ad.withTransaction(tx2, function() {
          this.dbDrop(function() {
            DB.transaction(function(tx3) {
              Ad.withTransaction(tx3, function() { this.dbInit(); });
            }, storage.errorCallback, function() {
              Ad.storeMulti(ads, callback || fun.FT);
            });
          });
        });
      } else {
        callback && callback();
      }
    });
  }, storage.errorCallback);
}

function migrateIDB(uid, DB, tx) {
  var adStore = tx.objectStore(Ad.objectStoreName());
  adStore.createIndex(
    'account_id',     // index name
    'account_id',     // keyPath
    { unique: false } // unique index
  );
  // this was hard, wasn't it?
  // God, WebSQL is idiotic.
}

exports.migrateWebSql = migrateWebSql;
exports.migrateIDB = migrateIDB;
