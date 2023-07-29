/**
 * Singleton providing class for a common data model.
 *  
 * @module alfresco/core/CoreData
 * @author Dave Draper
 */
define(["dojo/_base/declare",
        "alfresco/core/ObjectTypeUtils",
        "dojox/uuid/generateRandomUuid"], 
        function(declare, ObjectTypeUtils, uuid) {

   // This is a simple singleton pattern. Technically there it is still possible to instantiate a new data model,
   // but as the core will always use the singleton and it is expected that all calls will go through the core
   // then this shouldn't be a problem...
   var DataModel = declare(null, {
      
      /**
       * @instance
       */
      root: {},
      
      /**
       * @instance
       */
      callbacks: {},
      
      /**
       * @instance
       * @returns {object[]}
       */
      getDataStoreFriendlyData: function alfresco_core_CoreData__getDataStoreFriendlyData() {
         var data = [{
            root: true,
            id: "ROOT",
            children: this.getDataItems(this.root)
         }];
         return data;
      },
      
      /**
       * Recursing function that converts an object into an array where the value assigned to
       * each key in the object becomes an element in the array. The "_alfValue" and "_alfCallbacks"
       * keys are ignored.  
       * 
       * @instance
       * @param {object} obj The object to convert to an array
       * @returns {object[]} An array of objects
       */
      getDataItems: function alfresco_core_CoreData__getDataItems(obj) {
         var items = [];
         if (ObjectTypeUtils.isObject(obj))
         {
            for (var key in obj)
            {
                  var procData = { id: uuid(), 
                                   label: key, 
                                   type: "path" };
                  var rawData = obj[key];
                  procData.children = this.getDataItems(rawData._alfValue);
                  items.push(procData);
            }
         }
         else
         {
            items.push({id: uuid(), 
                        label: obj + "",
                        type: "value"});
         }
         return items;
      }
   });
   
   var instance; 
   DataModel.getSingleton = function() {
      if (instance == null)
      {
         instance = new DataModel(); 
      }
      return instance;
   };
   return DataModel;
});