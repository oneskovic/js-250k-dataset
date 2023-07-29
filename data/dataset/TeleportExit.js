var TeleportExit = Unit.extend({
    Init: function(position, id, metadata) {

        if ( !isProduction ) {
            this.drawNameMesh = true;
            this.overrideName = Math.abs(id);
        }

        this._super(position, null, id, 'Teleport Exit', 1.0);

        this.metadata = metadata;

        this.dynamic = false;
    },
    Add: function() {
        this._super();

        if ( this.metadata && this.metadata.invisible ) return;

        (function(unit){
        setTimeout(function(){
            unit.particleEmittersToMaintain.push(particleHandler.Add(ParticleTypeEnum.TELEPORTEXIT, {followUnit:unit}));
            unit.particleEmittersToMaintain.push(particleHandler.Add(ParticleTypeEnum.TELEPORTEXITCIRCLES, {followUnit:unit}));
        }, 0);
        })(this);

    },
    tick: function(dTime) {


        this._super(dTime);


    }
});
