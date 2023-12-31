//### Support Module Var:

    //shim import Map
    var Map = require('./../interfaces/Map.js');

    //var uniqueIds = new Map
    var uniqueIds = new Map();

    //    public function set(prefix, value)
    // ---------------------------
    function set(prefix, value){
//Generate unique numbers, starting at 1

        //uniqueIds.set prefix, value-1
        uniqueIds.set(prefix, value - 1);
    }
    // export
    module.exports.set = set;

    //    public function get(prefix) returns number
    // ---------------------------
    function get(prefix){
//Generate unique numbers, starting at 1

        //var id = uniqueIds.get(prefix) or 0
        var id = uniqueIds.get(prefix) || 0;

        //id += 1
        id += 1;

        //uniqueIds.set prefix, id
        uniqueIds.set(prefix, id);

        //return id
        return id;
    }
    // export
    module.exports.get = get;

    //    public function getVarName(prefix) returns string
    // ---------------------------
    function getVarName(prefix){
//Generate unique variable names

        //return '_#{prefix}#{get(prefix)}'
        return '_' + prefix + (get(prefix));
    }
    // export
    module.exports.getVarName = getVarName;
// -----------
// Module code
// -----------
// end of module
