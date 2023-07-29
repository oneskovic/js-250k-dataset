Dash.di.DashContext = function () {
    "use strict";

    return {
        system : undefined,
        setup : function () {
            Dash.di.DashContext.prototype.setup.call(this);

            this.system.mapClass('parser', Dash.dependencies.DashParser);
            this.system.mapClass('indexHandler', Dash.dependencies.DashHandler);
            this.system.mapSingleton('baseURLExt', Dash.dependencies.BaseURLExtensions);
            this.system.mapClass('fragmentExt', Dash.dependencies.FragmentExtensions);
            this.system.mapClass('trackController', Dash.dependencies.RepresentationController);
            this.system.mapSingleton('manifestExt', Dash.dependencies.DashManifestExtensions);
            this.system.mapSingleton('metricsExt', Dash.dependencies.DashMetricsExtensions);
            this.system.mapSingleton('timelineConverter', Dash.dependencies.TimelineConverter);
            this.system.mapSingleton('adapter', Dash.dependencies.DashAdapter);
        }
    };
};

Dash.di.DashContext.prototype = new MediaPlayer.di.Context();
Dash.di.DashContext.prototype.constructor = Dash.di.DashContext;
