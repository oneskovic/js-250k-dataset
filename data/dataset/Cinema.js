var Cinema = Class.extend({
    Init: function() {


        this.queue = [];


    },
    PlayCutscene: function(id) {
        $("#chatBox").css("opacity", 0);
        hudHandler.hideHUD();
    $('#black-bar-top,#black-bar-bottom').animate({
        height: 60
      }, 1000, function() {

      });

        this.queue.push({
            id: id,
            hasStarted: false
        });

    },
    EndCutscene: function() {

    $('#black-bar-top,#black-bar-bottom').animate({
        height: 0
      }, 1000, function() {
        hudHandler.ShowHUD();
        $("#chatBox").css("opacity", "");
      });

        this.queue.shift();

    },
    Clear: function() {

        $('#black-bar-top,#black-bar-bottom').animate({
            height: 0
          }, 1000, function() {
            hudHandler.ShowHUD();
          });

        this.queue = [];

        TWEEN.removeAll();

    },
    IsPlaying: function() {
        return this.queue.length !== 0;
    },
    tick: function(dTime) {

        if ( this.queue.length === 0 ) return;

        var nowPlaying = this.queue[0];

        var scene = nowPlaying.id;

        if ( !nowPlaying.hasStarted ) {
            nowPlaying.hasStarted = true;
            Cutscenes[scene].cinema = this;
            Cutscenes[scene].start();
        }


        Cutscenes[scene].tick(dTime);

    }
});



var cinema = new Cinema();
