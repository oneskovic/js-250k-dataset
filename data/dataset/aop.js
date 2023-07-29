var InvalidAspect = new Error("Missing a valid aspect. Aspect is not a function.");
var InvalidObject = new Error("Missing valid object or an array of valid objects.");
var InvalidMethod = new Error("Missing valid method to apply aspect on.");

function doAround(func, aroundFunc){
    return function(){
        aroundFunc.prototype._innerFunc = func

        return aroundFunc.apply(this,arguments)
    };
}

Aspects = function(){};
Aspects.prototype={


    addIntroduction : function(aspect, objs){
        function _addIntroduction(intro, obj){
            for (var m in intro.prototype) {
                obj.prototype[m] = intro.prototype[m];
            }
        }
        var oType = typeof(objs);

        if (typeof(aspect) != 'function')
            throw(InvalidAspect);

        if (oType == 'function'){
            _addIntroduction(aspect, objs);
        }
        else if (oType == 'object'){
            for (var n = 0; n < objs.length; n++){
                _addIntroduction(aspect, objs[n]);
            }
        }
        else{
            throw InvalidObject;
        }
    },

    addAround : function(aspect, obj, funcs){
        if (typeof(aspect) != 'function')
            throw InvalidAspect;

        if (typeof(funcs) != 'object')
            funcs = Array(funcs);

        for (var n = 0; n < funcs.length; n++)
        {
            var fName = funcs[n];
            var old;
            if(obj){
                old = obj.prototype[fName];
            }
            if (!old)
                throw InvalidMethod;

            var res = doAround(old,aspect);
            obj.prototype[fName] = res;
        }

    }

}
exports.addIntroduction = Aspects.prototype.addIntroduction
exports.addAround = Aspects.prototype.addAround