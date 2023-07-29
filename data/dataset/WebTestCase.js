var WebTest = function(name) {
    TestCase.call(this, "WebTest." + name);
};

WebTest.prototype = new TestCase();

_.extend(WebTest.prototype, {
    
    testServerUnresponsive : function() {
        var result = {eventTriggered:false, legacyEventTriggered:false};
        clearWebmock();
        
        webmock("POST", "http://localhost:7474/db/data/node", function(req) {
            req.failure(new neo4j.exceptions.ConnectionLostException());
        });
        
        // Legacy behaviour
        neo4j.events.bind("web.connection.failed", function() {
            result.legacyEventTriggered = true;
        });
        
        neo4j.events.bind("web.connection_lost", function() {
            result.eventTriggered = true;
        });
        
        mockWeb.post("http://localhost:7474/db/data/node");
        
        this.assertTrue("Legacy connection failed event should have been triggered.", result.legacyEventTriggered);
        this.assertTrue("Connection lost event should have been triggered.", result.eventTriggered);
        
    }
});
