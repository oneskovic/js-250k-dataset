IDBObjectStore = function () {};

/**
 * @type {string}
 */
IDBObjectStore.prototype.name = '';

/**
 * @type {*}
 */
IDBObjectStore.prototype.keyPath = null;

/**
 * @type {DOMStringList}
 */
IDBObjectStore.prototype.indexNames = new DOMStringList();

/**
 * @type {IDBTransaction}
 */
IDBObjectStore.prototype.transaction = new IDBTransaction();

/**
 * @type {boolean}
 */
IDBObjectStore.prototype.autoIncrement = false;

/**
 * @param {*} value
 * @param {*} [key]
 * @returns {IDBRequest}
 */
IDBObjectStore.prototype.put = function (value, key) {
  return new IDBRequest();
};

/**
 * @param {*} value
 * @param {*} [key]
 * @returns {IDBRequest}
 */
IDBObjectStore.prototype.add = function (value, key) {
  return new IDBRequest();
};

/**
 * @param {*} key
 * @returns {IDBRequest}
 */
IDBObjectStore.prototype.delete = function (key) {
  return new IDBRequest();
};

/**
 * @param {*} key
 * @returns {IDBRequest}
 */
IDBObjectStore.prototype.get = function (key) {
  return new IDBRequest();
};

/**
 * @returns {IDBRequest}
 */
IDBObjectStore.prototype.clear = function () {
  return new IDBRequest();
};

/**
 * @param {*} [range]
 * @param {string} [direction='next']
 * @returns {IDBRequest}
 */
IDBObjectStore.prototype.openCursor = function (range, direction) {
  return new IDBRequest();
};

/**
 * @param {string} name
 * @param {string|Array} keyPath
 * @param {object} [optionalParameters]
 * @param {boolean} [optionalParameters.unique=false]
 * @param {boolean} [optionalParameters.multiEntry=false]
 * @returns {IDBIndex}
 */
IDBObjectStore.prototype.createIndex = function (name, keyPath, optionalParameters) {
  return new IDBIndex();
};

/**
 * @param {string} name
 * @returns {IDBIndex}
 */
IDBObjectStore.prototype.index = function (name) {
  return new IDBIndex();
};

/**
 * @param {string} indexName
 * @returns {void}
 */
IDBObjectStore.prototype.deleteIndex = function (indexName) {};

/**
 * @param {*} [key]
 * @returns {IDBRequest}
 */
IDBObjectStore.prototype.count = function (key) {
  return new IDBRequest();
};
