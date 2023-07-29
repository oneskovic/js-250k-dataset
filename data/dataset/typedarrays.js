(function ()
{
    // Save the original Array constructor in case of redefinition
    var Array = this.Array;

    function TypedArrayCtor(x)
    {
        var a = (x instanceof Array)? x:Array(x);
        a.subarray = Array.prototype.slice;
        return a;
    }

    Int8Array = TypedArrayCtor;
    Int32Array = TypedArrayCtor;
    Uint8Array = TypedArrayCtor;
    Uint32Array = TypedArrayCtor;
    Float32Array = TypedArrayCtor;
    Float64Array = TypedArrayCtor;

}());

