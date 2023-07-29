"use strict";


/*----------------------------------------------------------------------------
**  SpiceArrayBufferSlice
**    This function is a work around for IE 10, which has no slice()
**    method in it's subclass.
**--------------------------------------------------------------------------*/
function SpiceArrayBufferSlice(start, end)
{
    start = start || 0;
    end = end || this.byteLength;
    if (end < 0)
        end = this.byteLength + end;
    if (start < 0)
        start = this.byteLength + start;
    if (start < 0)
        start = 0;
    if (end < 0)
        end = 0;
    if (end > this.byteLength)
        end = this.byteLength;
    if (start > end)
        start = end;

    var ret = new ArrayBuffer(end - start);
    var in1 = new Uint8Array(this, start, end - start);
    var out = new Uint8Array(ret);
    var i;

    for (i = 0; i < end - start; i++)
        out[i] = in1[i];

    return ret;
}

if (! ArrayBuffer.prototype.slice)
{
    ArrayBuffer.prototype.slice = SpiceArrayBufferSlice;
    console.log("WARNING:  ArrayBuffer.slice() is missing; we are extending ArrayBuffer to compensate");
}
