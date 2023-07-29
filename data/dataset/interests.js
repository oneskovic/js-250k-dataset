requireCss("./interests/interests.css");

var fun = require("../../../uki-core/function"),
    view = require("../../../uki-core/view"),
    dom   = require("../../../uki-core/dom"),
    controls = require("../controls"),
    Base = require("./base").Base;

var Interests = view.newClass('ads.adEditor.Interests', Base, {

  _template: requireText('interests/interests.html'),
      _ad: null,

  _setupBindings: function(m) {
    this.child('interests').binding({
      model: m,
      modelProp: 'keywords'
    });
    this.child('bct').binding({
      model: m,
      modelProp: 'user_adclusters'
    });

    this._ad = m;
  },

  _createDom: function(initArgs) {
    Base.prototype._createDom.call(this, initArgs);

    this.addClass('adEditor-interests');
    this.content({
      interests: {
        view: controls.pit,
        childName: 'interests'
      },
      interests_link: {
        view: 'Text',
        childName: 'interests_link',
        className: 'interests-link pas mls',
        text: 'Switch to broad category targeting'
      },
      bct : {
        view: controls.bct,
        childName: 'bct',
        className: 'hidden_elem mls'
      },
      bct_link: {
        view: 'Text',
        childName: 'bct_link',
        className: 'interests-link hidden_elem pas mls',
        text: 'Switch to precise interest targeting'
      }
    });

    this._indexChildViews();
    this.child('interests_link').
      addListener('mousedown', fun.bind(function(e) {
      this._showKeywords();
    }, this));

    this.child('bct_link').
      addListener('mousedown', fun.bind(function(e) {
      this._showClusters();
    }, this));
  },

  _showKeywords: function() {

    dom.removeClass(this.child('bct').dom(), 'hidden_elem');
    dom.removeClass(this.child('bct_link').dom(), 'hidden_elem');
    dom.addClass(this.child('interests').dom(), 'hidden_elem');
    dom.addClass(this.child('interests_link').dom(), 'hidden_elem');

    this._ad.interests_toggle(true);
  },

  _showClusters: function() {
    dom.addClass(this.child('bct').dom(), 'hidden_elem');
    dom.addClass(this.child('bct_link').dom(), 'hidden_elem');
    dom.removeClass(this.child('interests').dom(), 'hidden_elem');
    dom.removeClass(this.child('interests_link').dom(), 'hidden_elem');

    this._ad.interests_toggle(false);
  }
});


exports.Interests = Interests;
