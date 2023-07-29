var Sync = require('..');

var someGatewayMethod = function() {
    
    var scope = Sync.scope;
    setInterval(function(){
        console.log(scope.req);
    }, 1000)
    
}.async()

// One fiber (e.g. user's http request)
Sync(function(){
    
    Sync.scope.req = 'request #1';
    
    // future() runs someGatewayMethod in a separate "forked" fiber
    someGatewayMethod.future();
})

// Another fiber (e.g. user's http request)
Sync(function(){
    
    Sync.scope.req = 'request #2';
    
    // future() runs someGatewayMethod in a separate "forked" fiber
    someGatewayMethod.future();
})
