var jsDAV       = require("./../jsdav"),
    jsDAV_iNode = require("./iNode").jsDAV_iNode;

/**
 * iProperties interface
 *
 * Implement this interface to support custom WebDAV properties requested and sent from clients.
 */
function jsDAV_iProperties() {}

exports.jsDAV_iProperties = jsDAV_iProperties;

(function() {
    this.REGBASE = this.REGBASE | jsDAV.__IPROPERTIES__;

    /**
     * Updates properties on this node,
     *
     * The properties array uses the propertyName in clark-notation as key,
     * and the array value for the property value. In the case a property
     * should be deleted, the property value will be null.
     *
     * This method must be atomic. If one property cannot be changed, the
     * entire operation must fail.
     *
     * If the operation was successful, true can be returned.
     * If the operation failed, false can be returned.
     *
     * Deletion of a non-existant property is always succesful.
     *
     * Lastly, it is optional to return detailed information about any
     * failures. In this case an array should be returned with the following
     * structure:
     *
     * array(
     *   403 => array(
     *      '{DAV:}displayname' => null,
     *   ),
     *   424 => array(
     *      '{DAV:}owner' => null,
     *   )
     * )
     *
     * In this example it was forbidden to update {DAV:}displayname.
     * (403 Forbidden), which in turn also caused {DAV:}owner to fail
     * (424 Failed Dependency) because the request needs to be atomic.
     *
     * @param {Object} properties
     * @return bool|array
     */
    this.updateProperties = function(properties, cbupdateprops) {
        cbupdateprops();
    };

    /**
     * Returns a list of properties for this nodes.
     *
     * The properties list is a list of propertynames the client requested,
     * encoded in clark-notation {xmlnamespace}tagname
     *
     * If the array is empty, it means 'all properties' were requested.
     *
     * @param {Object} properties
     * @return void
     */
    this.getProperties = function(properties, cbgetprops) {
        cbgetprops();
    };
}).call(jsDAV_iProperties.prototype = new jsDAV_iNode());
