/**
 * This plugins menu items for the control panel
 */
define(function(require, exports, module) {
  'use strict';

  var fileMenuItems = [
    {
      name: "New Notebook",
      tooltip: "Open a new empty notebook, add the languages of your choice",
      sortorder: 100,
      action: function() {
        bkHelper.newSession(true);
      }
    },
    {
      name: "Open recent",
      sortorder: 120,
      id: "open-recent-menuitem",
      items: function() {
        return bkHelper.getRecentMenuItems();
      }
    },
    {
      name: "Open",
      id: "open-menuitem",
      sortorder: 110
    },
    {
      name: "Upload (.bkr)",
      id: "import-menuitem",
      sortorder: 130,
      action: bkHelper.importNotebookDialog
    }
  ];

  var menuItemsDeferred = bkHelper.newDeferred();
  bkHelper.getHomeDirectory().then(function(homeDir) {
    var toAdd = [
      {
        parent: "File",
        id: "file-menu",
        items: fileMenuItems
      },
      {
        parent: "File",
        id: "file-menu",
        submenu: "Open",
        submenusortorder: 110,
        items: [
          {
            name: "Open... (.bkr)",
            id: "open-menuitem",
            tooltip: "Open a bkr notebook file",
            sortorder: 100,
            action: function() {
              bkHelper.showModalDialog(
                  function(originalUrl) {
                    bkHelper.openNotebook(originalUrl);
                  },
                  JST['template/opennotebook']({homedir: homeDir, extension: '.bkr'}),
                  bkHelper.getFileSystemFileChooserStrategy()
              );
            }
          }
        ]
      }
    ];
    menuItemsDeferred.resolve(toAdd);
  });

  exports.getMenuItems = function() {
    return menuItemsDeferred.promise;
  };
});
