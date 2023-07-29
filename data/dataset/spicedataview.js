"use strict";


/*----------------------------------------------------------------------------
**  SpiceDataView
** FIXME FIXME 
**    This is used because Firefox does not have DataView yet.
**    We should use DataView if we have it, because it *has* to 
**    be faster than this code 
**--------------------------------------------------------------------------*/
function SpiceDataView(buffer, byteOffset, byteLength)
{
    if (byteOffset !== undefined)
    {
        if (byteLength !== undefined)
            this.u8 = new Uint8Array(buffer, byteOffset, byteLength);
        else
            this.u8 = new Uint8Array(buffer, byteOffset);
    }
    else
        this.u8 = new Uint8Array(buffer);
};

SpiceDataView.prototype = {
    getUint8:  function(byteOffset)
    {
        return this.u8[byteOffset];
    },
    getUint16:  function(byteOffset, littleEndian)
    {
        var low = 1, high = 0;
        if (littleEndian)
        {
            low = 0;
            high = 1;
        }

        return (this.u8[byteOffset + high] << 8) | this.u8[byteOffset + low];
    },
    getUint32:  function(byteOffset, littleEndian)
    {
        var low = 2, high = 0;
        if (littleEndian)
        {
            low = 0;
            high = 2;
        }

        return (this.getUint16(byteOffset + high, littleEndian) << 16) | 
                this.getUint16(byteOffset + low, littleEndian);
    },
    getUint64: function (byteOffset, littleEndian)
    {
        var low = 4, high = 0;
        if (littleEndian)
        {
            low = 0;
            high = 4;
        }

        return (this.getUint32(byteOffset + high, littleEndian) << 32) |
                this.getUint32(byteOffset + low, littleEndian);
    },
    setUint8:  function(byteOffset, b)
    {
        this.u8[byteOffset] = (b & 0xff);
    },
    setUint16:  function(byteOffset, i, littleEndian)
    {
        var low = 1, high = 0;
        if (littleEndian)
        {
            low = 0;
            high = 1;
        }
        this.u8[byteOffset + high] = (i & 0xffff) >> 8;
        this.u8[byteOffset + low]  = (i & 0x00ff);
    },
    setUint32:  function(byteOffset, w, littleEndian)
    {
        var low = 2, high = 0;
        if (littleEndian)
        {
            low = 0;
            high = 2;
        }

        this.setUint16(byteOffset + high, (w & 0xffffffff) >> 16, littleEndian);
        this.setUint16(byteOffset + low,  (w & 0x0000ffff), littleEndian);
    },
    setUint64:  function(byteOffset, w, littleEndian)
    {
        var low = 4, high = 0;
        if (littleEndian)
        {
            low = 0;
            high = 4;
        }

        this.setUint32(byteOffset + high, (w & 0xffffffffffffffff) >> 32, littleEndian);
        this.setUint32(byteOffset + low,  (w & 0x00000000ffffffff), littleEndian);
    },
}
