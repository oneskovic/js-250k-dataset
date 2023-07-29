 
 
var BuyMenu = Menu.extend({
    _init: function(parent, shop, itemList) {
        var menu = this;
        this._parent = parent;
        this._shop = shop;
        this._itemList = itemList;
        this._items = [];
        var numItems = this._getItems();
        var texts = this._getTexts();
        // var flags = this._getFlags();
        var callbacks = this.createCallbacks(numItems);
        this._super({
            type: BUY_MENU,
            numberSelections: numItems,
            drawBox: true,
            left: 100,
            top: 0,
            width: 300,
            height: 250,
            radius: 40,
            thickness: 5,
            pointerLeft: 124,
            textLeft: 144,
            heights: [ 35, 55, 75, 95, 115, 135, 155, 175, 195, 215 ],
            texts: texts,
            // flags: flags,
            font: "bold 16px monospace",
            callbacks: callbacks,
            canESC: true,
            // beforeCallback: function() { menu.clear(); },
            // afterCallback: function() { menu._parent.setCurrentMenu(menu._parent); },
            afterClear: function() { menu._parent.returnTo(); }
        });
    },
    
    _getItems: function() {
        var numItems = 0;
        var itemMenu = this;
        for (var i = 0; i < this._itemList.length; ++i) {
            var itemId = this._itemList[i];
            var item = {};
            item.name = g_itemData.items[itemId].name;
            item.type = g_itemData.items[itemId].type;
            item.cost = g_itemData.items[itemId].cost;
            item.id = itemId;
            itemMenu._items.push(item);
            numItems++;
        }
        
        return numItems;
    },
    
    _getTexts: function() {
        var texts = [];
        for (var i = 0; i < this._items.length; ++i) {
            var item = this._items[i];
            var itemText = item.name;
            while (itemText.length < 16)
                itemText += " ";
            var itemCost = item.cost + "";
            while (itemCost.length < 5)
                itemCost = " " + itemCost;
            texts[i] = itemText + itemCost;
        }
        return texts;
    },

    callback: function(i) {
        this._shop.handlePurchase(this._items[i]);
    }
});