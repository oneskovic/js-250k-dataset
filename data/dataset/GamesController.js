goog.provide('mvcapp.controllers.GamesController');
goog.require('mvcapp.views.layouts.rare');
goog.require('mvcapp.views.scripts.games.index');
goog.require('mvcapp.views.scripts.games.list');
goog.require('tart.mvc.Controller');



/**
 * @constructor
 * @extends {tart.mvc.Controller}
 */
mvcapp.controllers.GamesController = function() {
    goog.base(this);
};
goog.inherits(mvcapp.controllers.GamesController, tart.mvc.Controller);


/**
 * @this {tart.mvc.Action}
 * @return {tart.mvc.uri.Redirection} This action redirects to 'home anything' route.
 */
mvcapp.controllers.GamesController.indexAction = function() {
    this.setViewScript(mvcapp.views.scripts.games.index);
    this.setLayout(mvcapp.views.layouts.rare);
    console.log('games index');
    this.view.p1 = this.params['p1'];
    this.view.p2 = this.params['p2'];
    this.view.a = this.params['a'];
    this.view.b = this.params['b'];

    if (this.view.p1 == 'a')
        return mvcapp.router.redirectToRoute('home anything', {'p1': 'pe1', 'p2': 'pe2', 'c': 'd'});
    return null;
};


/**
 * @this {tart.mvc.Action}
 */
mvcapp.controllers.GamesController.listAction = function() {
    this.setViewScript(mvcapp.views.scripts.games.list);
    this.view.vp1 = this.params['param1'];
    this.view.vp2 = this.params['param2'];
    console.log('games list');
};


/**
 * @this {tart.mvc.Action}
 */
mvcapp.controllers.GamesController.showAction = function() {
    this.setViewScript(mvcapp.views.scripts.games.index);
    console.log('games show');
};
