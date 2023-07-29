"use strict";

var getSource = io.nodyn.natives.NativesWrap.getSource;

var source = {};

[
  'nodyn',

  'events',
  'util',

  'buffer',
  'smalloc',
  'tracing',

  'path',
  'module',

  'vm',

  'assert',

  'fs',
  'nodyn/blocking',

  'stream',
  '_stream_readable',
  '_stream_writable',
  '_stream_duplex',
  '_stream_transform',
  '_stream_passthrough',

  'punycode',
  'os',

  'tty',

  'repl',
  'readline',
  'console',
  'domain',

  'string_decoder',

  'net',
  'tls',
  '_tls_common',
  '_tls_wrap',
  '_tls_legacy',

  'querystring',
  'http',
  'https',
  '_http_agent',
  '_http_client',
  '_http_server',
  '_http_incoming',
  '_http_outgoing',
  '_http_common',
  'url',
  'dns',
  'dgram',

  'timers',
  '_linklist',
  'freelist',

  'zlib',

  'cluster',
  'child_process',

  'crypto',
  'constants',

  '_debugger',

].forEach( function(name) {
  source[name] = getSource(name);
});

// see node.js startup.processConfig
source.config = "\n{}";

module.exports = source;

