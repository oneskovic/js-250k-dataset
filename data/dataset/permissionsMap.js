var permissionsMap = function(kontx, next){
    'use strict';

     var nodeid = kontx.args.id,
         userPermissions = kontx.user.permissions,
         currentRole = kontx.user.role.toLowerCase(),
         _ = require('lodash'),
         async = require('async'),
         roles = require('../../security/roles'),
         db = require('../../db');

    function error(err){
        next(err);
    }

    function setPermission(item, cb){
        var permission = _.find(userPermissions, function(permission){
            return (permission.nodeid.toString() === item);
        });

        if(!_.isUndefined(permission)) {
            currentRole = permission.role;
        }
        else {
            kontx.user.permissions.push({nodeid: item._id, role: currentRole});
        }

        cb();
    }

    function finalize() {
        setPermission({_id: nodeid}, next);
    }

    function buildMap(node) {
        if(_.isArray(node.ancestors)) {
            async.each(node.ancestors, setPermission);
        }
    }

    if(_.isUndefined(kontx.user.permissions)){
        kontx.user.permissions = [];
    }

    db.nodes.getById(nodeid).then(buildMap).fail(error).done(finalize);
};

module.exports = permissionsMap;