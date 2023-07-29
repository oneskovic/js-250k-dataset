var Lever = Unit.extend({
    Init: function(data) {
        this._super(data);

        this.useTimeout = 0.0;
        this.on = false;
    },
    Awake: function() {

        var self = this;

        if (!self.data.switchNumber) {
            log("Bad switch number for " + self.id);
            self.targetUnit = null;
        } else {

            self.data.switchNumber = -Math.abs(self.data.switchNumber);

            worldHandler.FindUnit(self.data.switchNumber)
                .then(function(unit) {

                    if (unit instanceof ToggleableObstacle) {
                        self.targetUnit = unit;
                    }

                    if (self.targetUnit) {
                        self.targetUnit.UpdateLeverList();
                        self.Toggle(self.targetUnit.on);
                    }

                }).fail(function(err) { 

                    console.error('Game/Special/Lever.js',
                        'Not found', self.data.switchNumber);
                
                });       
        }

        self._super();
    },
    Toggle: function(bool) {
        log("[Lever] " + this.id + " toggled " + (bool ? "on" : "off"));

        this.on = bool;

        this.EmitNearby('toggle', {
            id: this.id,
            on: this.on
        });

        this.useTimeout = 2.0;
    },
    Tick: function(dTime) {
        this._super(dTime);

        if (this.useTimeout > 0) {
            this.useTimeout -= dTime;
        } else {
            
            var self = this,
                shouldContinue = true; 

            worldHandler.LoopUnitsNear(self.zone, self.cellX, self.cellZ, function(unit) { 

                if(!shouldContinue) {
                    return;
                }

                if(unit.isPlayer()) {
                    if (unit.InRangeOfUnit(self, 1)) {

                        if (self.targetUnit) {
                            self.targetUnit.Toggle(!self.on);
                        }

                        shouldContinue = false;
                    }
                }

            }, 0); 

        }
    }
});
