 

var NUM_SAVE_SLOTS = 4;

var SlotMenu = Menu.extend({
    _init: function(mainMenu) {
        this._mainMenu = mainMenu;
        var callbacks = this.createCallbacks(NUM_SAVE_SLOTS);
        var menu = this;
        this._super({
            numberSelections: NUM_SAVE_SLOTS,
            drawBox: true,
            left: 150,
            top: 0,
            width: 250,
            height: 200,
            radius: 25,
            thickness: 4,
            pointerLeft: 170,
            textLeft: 195,
            heights: [ 20, 60, 100, 140 ],
            font: "bold 16px monospace",
            callbacks: callbacks,
            canESC: true,
            afterCallback: function() { menu._mainMenu.setCurrentMenu(menu._mainMenu); },
            afterClear: function() { menu._mainMenu.returnTo(); }
        });
    }
});