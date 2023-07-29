/**
 * Create a swagger query parameter
 *
 * @param  {String}     name                The parameter name
 * @param  {String}     [description]       The parameter description
 * @param  {String}     dataType            The parameter dataType
 * @param  {Boolean}    [required]          Whether this parameter is required. Defaults to `false`
 * @param  {Boolean}    [allowMultiple]     Whether this parameter can be passed multiple times. Defaults to `false`
 * @param  {Object}     [allowableValues]   The values that this parameter can be set to, looks like: `{'valueType': 'LIST', 'values': ['foo', 'bar']}`
 * @param  {String}     [defaultValue]      The value this parameter will take if no value is passed
 * @return {QueryParameter}                 A swagger QueryParameter
 */
var query = module.exports.query = function(name, description, dataType, required, allowMultiple, allowableValues, defaultValue) {
    return {
        'paramType': 'query',
        'name': name,
        'description': description || '',
        'dataType': dataType,
        'required': required === true ? true : false,
        'allowMultiple': allowMultiple === true ? true : false,
        'allowableValues': allowableValues,
        'defaultValue': defaultValue
    };
};

/**
 * Create a swagger path parameter
 *
 * @param  {String}     name                The parameter name
 * @param  {String}     [description]       The parameter description
 * @param  {String}     dataType            The parameter dataType
 * @param  {Object}     [allowableValues]   The values that this parameter can be set to, looks like: `{'valueType': 'LIST', 'values': ['foo', 'bar']}`
 * @param  {String}     [defaultValue]      The value this parameter will take if no value is passed
 * @return {PathParameter}                  A swagger PathParameter
 */
var path = module.exports.path = function(name, description, dataType, allowableValues, defaultValue) {
    return {
        'paramType': 'path',
        'name': name,
        'description': description || '',
        'dataType': dataType,
        'required': true,
        'allowMultiple': false,
        'allowableValues': allowableValues,
        'defaultValue': defaultValue
    };
};

/**
 * Create a swagger body parameter
 *
 * @param  {String}     name                The parameter name
 * @param  {String}     [description]       The parameter description
 * @param  {String}     dataType            The parameter dataType
 * @param  {String}     [defaultValue]      The value this parameter will take if no value is passed
 * @return {BodyParameter}                  A swagger BodyParameter
 */
var body = module.exports.body = function(name, description, dataType, defaultValue) {
    return {
        'paramType': 'body',
        'name': name,
        'description': description || '',
        'dataType': dataType,
        'required': true,
        'allowMultiple': false,
        'defaultValue': defaultValue
    };
};

/**
 * Create a swagger form parameter
 *
 * @param  {String}     name                The parameter name
 * @param  {String}     [description]       The parameter description
 * @param  {String}     dataType            The parameter dataType
 * @param  {Boolean}    [required]          Whether this parameter is required. Defaults to `false`
 * @param  {Object}     [allowableValues]   The values that this parameter can be set to, looks like: `{'valueType': 'LIST', 'values': ['foo', 'bar']}`
 * @param  {String}     [defaultValue]      The value this parameter will take if no value is passed
 * @return {FormParameter}                  A swagger FormParameter
 */
var form = module.exports.form = function(name, description, dataType, required, allowableValues, defaultValue) {
    return {
        'paramType': 'form',
        'name': name,
        'description': description || '',
        'dataType': dataType,
        'required': required === true ? true : false,
        'allowableValues': allowableValues,
        'allowMultiple': false,
        'defaultValue': defaultValue
    };
};

/**
 * Create a swagger header parameter
 *
 * @param  {String}     name                The parameter name
 * @param  {String}     [description]       The parameter description
 * @param  {String}     dataType            The parameter dataType
 * @param  {Boolean}    [required]          Whether this parameter is required. Defaults to `false`
 * @return {HeaderParameter}                A swagger HeaderParameter
 */
var header = module.exports.header = function(name, description, dataType, required) {
    return {
        'paramType': 'header',
        'name': name,
        'description': description || '',
        'dataType': dataType,
        'required': required === true ? true : false,
        'allowMultiple': false
    };
};
