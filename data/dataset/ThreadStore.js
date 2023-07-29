var Store = require('rx-flux').Store;
var assign = require('object-assign');
var ChatActions = require('../actions/ChatActions');
var ChatMessageUtils = require('../utils/ChatMessageUtils');



function ThreadStore() {
  Store.call(this);
}

ThreadStore.prototype = Object.create(Store.prototype);

assign(ThreadStore.prototype, {
  constructor: ThreadStore,
  init: function () {
    var store = this;
    this.setValue({
      threads: {},
      currentID: null
    });
    
    store.observe(ChatActions.clickThread, function (threadID) {
      store.applyOperation(function (data) {
        var threads = Object.keys(data.threads).reduce(function (result, id) {
          var thread = data.threads[id];
          if (id === threadID) {
            var lastMessage = assign({}, thread.lastMessage, {isRead : true});
            result[id] = assign({}, thread, {lastMessage: lastMessage});
          } else {
            result[id] = thread;
          }
          return result;
        }, {});
        return {threads: threads, currentID: threadID};
      }, true);
    });
    
    store.observe(ChatActions.receiveRawMessages, function (rawMessages) {
      store.applyOperation(function (data) {
        var threads = assign({}, data.threads);
        var currentID = data.currentID;
        
        rawMessages.forEach(function(message) {
          var threadID = message.threadID;
          var thread = threads[threadID];
          if (thread && thread.lastTimestamp > message.timestamp) {
            return;
          }
          threads[threadID] = {
            id: threadID,
            name: message.threadName,
            lastMessage: ChatMessageUtils.convertRawMessage(message, currentID)
          };
        }, this);

        if (!currentID) {
          var allChrono = ChatMessageUtils.getAllChrono(threads);
          currentID = allChrono[allChrono.length - 1].id;
        }

        threads[currentID].lastMessage.isRead = true;
        
        return {
          threads: threads,
          currentID: currentID
        };
        
      }, true);
    });
  }
});



module.exports = ThreadStore;

