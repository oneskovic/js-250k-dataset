// Module dependencies.
var resourceResult = require('./resourceresult');

exports = module.exports;

exports.serialize = function (rule) {
  var properties = [
    'Filter',
    'Action'
  ];

  var resource = {};

  if (rule) {
    var filters = [];
    if (rule.sqlExpressionFilter) {
      var sqlFilter = {
        '$': {
          'i:type': 'SqlFilter'
        },
        SqlExpression: rule.sqlExpressionFilter,
        CompatibilityLevel: 20
      };

      filters.push(sqlFilter);
    } else if (rule.correlationIdFilter) {
      var correlationFilter = {
        '$': {
          'i:type': 'CorrelationFilter'
        },
        CorrelationId: rule.correlationIdFilter
      };

      filters.push(correlationFilter);
    } else if (rule.trueFilter) {
      var trueFilter = {
        '$': {
          'i:type': 'TrueFilter'
        },
        SqlExpression: rule.trueFilter,
        CompatibilityLevel: 20
      };

      filters.push(trueFilter);
    } else if (rule.falseFilter) {
      var falseFilter = {
        '$': {
          'i:type': 'FalseFilter'
        },
        SqlExpression: rule.falseFilter,
        CompatibilityLevel: 20
      };

      filters.push(falseFilter);
    }

    if (filters.length > 0) {
      resource.Filter = filters;
    }

    var actions = [];

    if (rule.sqlRuleAction) {
      var sqlAction = {
        '$': {
          'i:type': 'SqlFilterExpression'
        },
        SqlExpression: rule.sqlRuleAction
      };

      actions.push(sqlAction);
    } else {
      var emptyRuleAction = {
        '$': {
          'i:type': 'EmptyRuleAction'
        }
      };

      actions.push(emptyRuleAction);
    }

    if (actions.length > 0) {
      resource.Action = actions;
    }
  }

  return resourceResult.serialize('RuleDescription', resource, properties);
};

exports.parse = function (xml) {
  return resourceResult.parse('RuleDescription', [ 'TopicName', 'SubscriptionName', 'RuleName' ], xml);
};