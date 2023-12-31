(function() {

  Aria.classDefinition({
    $classpath: 'games.shoot.controller.level.LevelController',
    $extends: 'games.common.BaseObject',
    $dependencies: ['games.common.clock.AnimationLoop', 'games.common.clock.EngineClock', 'games.common.engine.GameEngine', 'games.common.input.StandardKeyboardRecorder', 'games.shoot.clock.StatsAwareEngineClock', 'games.shoot.enemy.generator.ShootEnemyGenerator', 'games.shoot.engine.ExtendedEngine', 'games.shoot.engine.OverlayEngine', 'games.shoot.engine.ShootEngine', 'games.shoot.overlay.Overlay', 'games.shoot.overlay.Pause', 'games.shoot.player.PlayerController', 'games.shoot.ship.ShipInputRecorder', 'games.shoot.Stats', 'games.shoot.utils.RecorderFactory'],
    $constructor: function(gameContext, overlayContext) {
      var kbRecorder, shipRecorder, statsRecorder;
      this.$BaseObject.constructor.call(this);
      kbRecorder = this.$RecorderFactory.getKeyboardRecorder();
      statsRecorder = new this.$Stats();
      this.gameEngine = this.$ShootEngine.getDefaultImplementation(gameContext, statsRecorder);
      this.gameClock = new this.$StatsAwareEngineClock(this.gameEngine, new this.$AnimationLoop, statsRecorder);
      shipRecorder = new this.$ShipInputRecorder(kbRecorder);
      this.playerController = new this.$PlayerController(this.gameEngine, shipRecorder);
      this.enemyController = new this.$ShootEnemyGenerator(this.gameEngine);
      this.recorder = new this.$StandardKeyboardRecorder(kbRecorder);
      this.overlayEngine = this.$ExtendedEngine.getDefaultImplementation(overlayContext);
      this.overlayClock = this.$EngineClock.getDefaultImplementation(this.overlayEngine);
      return this;
    },
    $prototype: {
      start: function() {
        this.gameEngine.addController(this.playerController);
        this.gameEngine.addController(this.enemyController);
        this.overlayEngine.addController(this);
        this.overlayEngine.addController(new this.$Overlay(this.overlayEngine, this.playerController));
        this.gameClock.start();
        return this.overlayClock.start();
      },
      update: function(deltaTime) {
        this.recorder.update();
        if (this.recorder.getInputByCode('P')) {
          this.pause();
        }
        if (this.recorder.getInputByCode('R')) {
          return this.resume();
        }
      },
      toggleEngine: function() {
        if (this.gameClock.isOn()) {
          return this.pause();
        } else {
          return this.resume();
        }
      },
      pause: function() {
        if (!this.pauseEntity) {
          this.pauseEntity = new this.$Pause();
          this.overlayEngine.addEntity(this.pauseEntity);
          return this.gameClock.stop();
        }
      },
      resume: function() {
        if (this.pauseEntity) {
          this.pauseEntity.destroy();
          this.pauseEntity = null;
          return this.gameClock.start();
        }
      }
    }
  });

}).call(this);
