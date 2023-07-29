(function () {
    RealtimeMultiplayerGame.namespace("RealtimeMultiplayerGame.controller.traits");

    RealtimeMultiplayerGame.controller.traits.KeyboardInputTrait = function () {
        RealtimeMultiplayerGame.controller.traits.KeyboardInputTrait.superclass.constructor.call(this);
    };

    RealtimeMultiplayerGame.controller.traits.KeyboardInputTrait.prototype = {
        displayName: "KeyboardInputTrait",					// Unique string name for this Trait
        /**
         * Attach the trait to the host object
         * @param anEntity
         */
        attach: function (anEntity) {
            RealtimeMultiplayerGame.controller.traits.KeyboardInputTrait.superclass.attach.call(this, anEntity);

            // Intercept those two properties from the attached enitity with our own
            this.intercept(['constructEntityDescription', 'handleInput']);
            this.attachedEntity.input = new RealtimeMultiplayerGame.Input.Keyboard();
            this.attachedEntity.input.attachEvents();
        },

        /**
         * Implement our own intercepted version of the methods/properties
         */
        constructEntityDescription: function (gameTick, wantsFullUpdate) {
            return {
                entityid: this.entityid,
                input: this.input.constructInputBitmask()
            }
        },

        // Do nothing
        handleInput: function (gameClock) {
        }
    };

    RealtimeMultiplayerGame.extend(RealtimeMultiplayerGame.controller.traits.KeyboardInputTrait, RealtimeMultiplayerGame.controller.traits.BaseTrait);
})();