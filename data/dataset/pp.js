'use strict';


define([
  'chai',
  'sinon',
  'views/pp'
],
function (chai, sinon, View) {
  var assert = chai.assert;

  describe('views/pp', function () {
    var view;

    beforeEach(function () {
      view = new View({});
    });

    afterEach(function () {
      view.remove();
      view.destroy();
    });

    it('Back button is displayed if there is a page to go back to', function () {
      sinon.stub(view, 'canGoBack', function () {
        return true;
      });

      return view.render()
          .then(function () {
            assert.equal(view.$('#fxa-pp-back').length, 1);
          });
    });

    it('Back button is not displayed if there is no page to go back to', function () {
      sinon.stub(view, 'canGoBack', function () {
        return false;
      });

      return view.render()
          .then(function () {
            assert.equal(view.$('#fxa-pp-back').length, 0);
          });
    });

    it('fetches translated text from the backend', function () {
      return view.render()
        .then(function () {
          assert.ok(view.$('#fxa-pp-header').length);
        });
    });
  });
});


