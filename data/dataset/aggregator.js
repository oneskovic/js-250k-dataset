exports.generic = function(type) {
  return [
    { $match: { type: type }},
    { $sort: { created_at : 1 }},
    { $group: {
        _id: {
          tracking_data   : '$tracking_data',
          environment     : '$environment'
        },
        id              : { $last: '$_id' },
        type            : { $last: '$type' },
        last_occurence  : { $last: '$created_at' },
        total_occurence : { $sum: 1 }
      }
    }
  ];
}


exports.xhr = function() {
  return [
      { $match: { type: 2 }},
      { $sort: { created_at : 1 }},
      { $group: {
          _id: {
            tracking_data : {
              method : '$method',
              status : '$status',
              url : '$url'
            },
            environment     : '$environment'
          },
          id              : { $last: '$_id' },
          type            : { $last: '$type' },
          tracking_data   : { $last: '$tracking_data' },
          last_occurence  : { $last: '$created_at' },
          environment     : { $last: '$environment' },
          total_occurence : { $sum: 1 }
        }
      }
    ];
};
