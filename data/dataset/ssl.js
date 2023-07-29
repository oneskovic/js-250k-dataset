var amqp = require('../');
var fs = require('fs');

// Assemble the SSL options; for verification we need at least
// * a certificate to present to the server ('cert', in PEM format)
// * the private key for the certificate ('key', in PEM format)
// * (possibly) a passphrase for the private key
//
// The first two may be replaced with a PKCS12 file ('pfx', in pkcs12
// format)

// We will also want to list the CA certificates that we will trust,
// since we're using a self-signed certificate. It is NOT recommended
// to use `rejectUnauthorized: false`.

// Options for full client and server verification:
var opts = {
  cert: fs.readFileSync('../etc/client/cert.pem'),
  key: fs.readFileSync('../etc/client/key.pem'),
  // cert and key or
  // pfx: fs.readFileSync('../etc/client/keycert.p12'),
  passphrase: 'MySecretPassword',
  ca: [fs.readFileSync('../etc/testca/cacert.pem')]
};

// Options for just confidentiality. This requires RabbitMQ's SSL
// configuration to include the items
//
//     {verify, verify_none},
//     {fail_if_no_peer_cert,false}
//
// var opts = {  ca: [fs.readFileSync('../etc/testca/cacert.pem')] };

// Option to use the SSL client certificate for authentication
// opts.credentials = amqp.credentials.external();

var open = amqp.connect('amqps://localhost', opts);

open.then(function(conn) {
  process.on('SIGINT', conn.close.bind(conn));
  return conn.createChannel().then(function(ch) {
    ch.sendToQueue('foo', new Buffer('Hello World!'));
  });
}).then(null, console.warn);
