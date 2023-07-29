 

var ItemMenu = Menu.extend({
    _init: function(mainMenu) {
        this._mainMenu = mainMenu;
        this._items = [];
        var numItems = this._getItems();
        var texts = this._getTexts();
        var flags = this._getFlags();
        var callbacks = this.createCallbacks(numItems);
        var menu = this;
        this._super({
            type: ITEM_MENU,
            numberSelections: numItems,
            drawBox: true,
            left: 150,
            top: 0,
            width: 250,
            height: 200,
            radius: 25,
            thickness: 4,
            pointerLeft: 170,
            textLeft: 186,
            heights: [ 20, 48, 76, 104, 132, 160 ],
            texts: texts,
            flags: flags,
            font: "bold 20px monospace",
            callbacks: callbacks,
            canESC: true,
            afterCallback: function() { menu._mainMenu.setCurrentMenu(menu._mainMenu); },
            afterClear: function() { menu._mainMenu.returnTo(); }
        });
    },
    
    _getItems: function() {
        var numItems = 0;
        var itemMenu = this;
        g_player.forEachItemInInventory(function(itemId, amt) {
            if (amt > 0) {
                var item = {};
                item.name = g_itemData.items[itemId].name;
                item.type = g_itemData.items[itemId].type;
                item.amt = amt;
                item.id = itemId;
                item.canUse = (item.type == ITEMTYPE_HEAL_ONE);
                itemMenu._items.push(item);
                numItems++;
            }
        });
        
        return numItems;
    },
    
    _getTexts: function() {
        var texts = [];
        for (var i = 0; i < this._items.length; ++i) {
            var item = this._items[i];
            var amt2 = (item.amt < 10) ? " " + item.amt : item.amt;
            texts[i] = item.name + ":" + amt2;
        }
        return texts;
    },
    
    _getFlags: function() {
        return _.map(this._items, function(item, index) {
            return !item.canUse;
        });
    },

    callback: function(i) {
        var item = this._items[i];
        this.clear();
        this._mainMenu.clear();
        var theItem = g_itemData.items[item.id];
        theItem.use(g_player);
        g_player.removeFromInventory(item.id);
    }
});