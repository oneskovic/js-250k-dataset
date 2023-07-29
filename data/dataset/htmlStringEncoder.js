/**
 * HTMLStringEncoder is used to encode strings so that they don't cause
 * problems in HTML.
 * This object is prefered over the using encodeString() directly as it
 * provides a cache so the expensive (O(n)) action of generating encoded
 * strings has to only be done once.
 * This cache does not check itself to make sure it doesn't grow too big. That's
 * up to its user.
 * @requires util.js this is a wrapper around the util encodeString function
 */
function HTMLStringEncoder(){
    /**
     * the cache, a hash. All keys should be prefixed with
     * HTMLStringEncoder.prefix
     */
    this.cache = new Object();
}

HTMLStringEncoder.prototype = {
    /**
     * prefix is used to prefix all cache keys
     */
    prefix: "html_"
    ,
    /**
     * returns an encoded version of str. Checks cache first.
     * @returns an encoded version of str
     */
    encodeString: function(str) {
        var rv = this.cache[this.prefix + str];
        if (rv === undefined ){
            rv = this.cache[this.prefix + str] = encodeString(str);
        }
        return rv;
    }
    ,
    /**
     * clears the cache
     */
    clear: function(){
        this.cache = new Object();
    }
    
}

function getHTMLStringEncoder() {
    if (typeof(__security_compass_html_string_encoder__) === 'undefined') {
        __security_compass_html_string_encoder__ = new HTMLStringEncoder;
    }
    return __security_compass_html_string_encoder__;
}
