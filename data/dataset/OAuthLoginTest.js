define(['explorer/widgets/login/OAuthLogin', 'dojo/query', 'dojo/topic',
        'dojo/NodeList-manipulate', 'dojo/NodeList-dom'], 
    function(OAuthLogin, query, topic){
  describe('An OAuthLogin widget', function(){
    beforeEach(function() {
      var div = document.createElement("div");
      div.style.display = 'none';
      div.id = 'login';
      div.innerHTML = '';
      document.body.appendChild(div);
    });
  
    afterEach(function() {
      document.body.removeChild(document.getElementById('login'));
    });
    
    it("can toggle a popup", function() {
      
      var oAuthLogin = new OAuthLogin({
        imageUrl: "",
        name: "testName",
        endpoint: "testEndpoint"
      }); 
      
      var calledFunction = jasmine.createSpy('calledFunction');
      
      var popup = {};
      popup.createOpenerOnClick = jasmine.createSpy('createOpenerOnClick').andReturn(calledFunction);
      
      window.gadgets.oauth = {};
      window.gadgets.oauth.Popup = jasmine.createSpy('Popup').andReturn(popup);

      oAuthLogin.togglePopup();
      
      expect(window.gadgets.oauth.Popup).toHaveBeenCalled();
      expect(popup.createOpenerOnClick).toHaveBeenCalled();
      expect(calledFunction).toHaveBeenCalled();
      
      oAuthLogin.destroy();
    }); 
    
    it("listens for the security token from the server and updates the welcome text", function() {
      var oAuthLogin = new OAuthLogin({
        imageUrl: "",
        name: "testName",
        endpoint: "testEndpoint"
      });
      
      oAuthLogin.popup = {};
      oAuthLogin.popup.win_ = {};
      oAuthLogin.popup.win_.close = jasmine.createSpy('close');
      oAuthLogin.popup.win_.document = {};
      oAuthLogin.popup.win_.document.responseObj = {securityToken: "abc123", securityTokenTTL: 456};
      
      oAuthLogin.onPopupOpen();
      
      var evt = window.document.createEvent('Event');
      evt.initEvent('returnSecurityToken', true, true);
      window.document.dispatchEvent(evt);
      
      expect(oAuthLogin.popup.win_.document.responseObj.securityToken).toBe("abc123");
      expect(oAuthLogin.popup.win_.document.responseObj.securityTokenTTL).toBe(456);
      expect(oAuthLogin.popup.win_.close).toHaveBeenCalled();
      expect(document.getElementById('login').innerHTML).toBe("Welcome!");
      
      oAuthLogin.onPopupClose();
      oAuthLogin.destroy();
    });
    
    it("closes removes the event listener if the user closes the window without logging in", function() {
      var oAuthLogin = new OAuthLogin({
        imageUrl: "",
        name: "testName",
        endpoint: "testEndpoint"
      });

      var calledFunction = jasmine.createSpy('calledFunction');
      
      var popup = {};
      popup.createOpenerOnClick = jasmine.createSpy('createOpenerOnClick').andReturn(calledFunction);
      popup.win_ = {};
      popup.win_.close = jasmine.createSpy('close');
      popup.win_.document = {};
      popup.win_.document.responseObj = {securityToken: "abc123", securityTokenTTL: 456};
      
      window.gadgets.oauth = {};
      window.gadgets.oauth.Popup = jasmine.createSpy('Popup').andReturn(popup);
      
      oAuthLogin.togglePopup();
      oAuthLogin.onPopupOpen();
      
      oAuthLogin.onPopupClose();
      
      spyOn(oAuthLogin, 'onSecurityTokenListener');
      var evt = window.document.createEvent('Event');
      evt.initEvent('returnSecurityToken', true, true);
      window.document.dispatchEvent(evt);
      
      expect(oAuthLogin.onSecurityTokenListener).not.toHaveBeenCalled();
      expect(document.getElementById('login').innerHTML).not.toBe("Welcome!");
      oAuthLogin.destroy();
    }); 
  });
});