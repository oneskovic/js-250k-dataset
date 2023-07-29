'use strict';

var express = require('express');
var assert = require('assert');

module.exports = function(quota) {
  var app = express();
  var counter = 1;

  app.get('/count',
    quota.expressMiddleware().apply(),
    function(req, resp) {
      resp.json({ count: counter++ });
    });

  app.get('/countId',
    quota.expressMiddleware().apply({ identifier: '/count' }),
    function(req, resp) {
      resp.json({ count: counter++ });
    });

  app.get('/countFunctionId',
    quota.expressMiddleware().apply({ identifier: idFunc('/count') }),
    function(req, resp) {
      resp.json({ count: counter++ });
    });

  app.get('/countWeight',
    quota.expressMiddleware().apply({ weight: 2 }),
    function(req, resp) {
      resp.json({ count: counter++ });
    });

  app.get('/countWeightFunc',
    quota.expressMiddleware().apply({ weight: weightFunc(2) }),
    function(req, resp) {
      resp.json({ count: counter++ });
    });

  app.get('/countWeightId',
    quota.expressMiddleware().apply({ identifier: '/countWeight2', weight: 2 }),
    function(req, resp) {
      resp.json({ count: counter++ });
    });

  app.get('/countWeightIdFunction',
    quota.expressMiddleware().apply({ identifier: idFunc('/countWeight2f'), weight: weightFunc(2) }),
    function(req, resp) {
      resp.json({ count: counter++ });
    });

  app.get('/countPerAddress',
    quota.expressMiddleware().applyPerAddress(),
    function(req, resp) {
      resp.json({ count: counter++ });
    });

  app.get('/countPerAddressId',
    quota.expressMiddleware().applyPerAddress({ identifier: '/countPerAddress' }),
    function(req, resp) {
      resp.json({ count: counter++ });
    });

  app.get('/countPerAddressFunctionId',
    quota.expressMiddleware().applyPerAddress({ identifier: idFunc('/countPerAddress') }),
    function(req, resp) {
      resp.json({ count: counter++ });
    });

  app.use(function(err, req, res, next) {
    if (err.status !== 403) { return next(err);}
    res.status(403);
    res.send(err.message);
  });

  return app;
};

var idFunc = function(id) {
  return function(req) {
    assert(req);
    return id;
  };
};

var weightFunc = function(weight) {
  return function(req) {
    assert(req);
    return weight;
  };
}