(function() {
  var amqp, argv, assert, check_results, count, default_exchange, exec, firehose_message, firehose_queue_name, message_s, publish_message, test_message, test_queue_name;

  argv = require('optimist').usage('' + 'Test tracing/firehose message receipt.' + '\nA firehose message is generated both when a message is published and when it is consumed.' + '\nNOTE: this test will attempt to enable and then disable tracing for the vhost using rabbitmqctl.').demand('host').describe('host', 'Host')["default"]('host', 'localhost').demand('port').describe('port', 'Port')["default"]('port', 5672).demand('vhost').describe('vhost', 'Virtual Host')["default"]('vhost', '/').demand('login').describe('login', 'Login')["default"]('login', 'guest').demand('password').describe('password', 'Password').argv;

  amqp = require('../amqp');

  exec = require('child_process').exec;

  assert = require('assert');

  message_s = "";

  publish_message = function() {
    var message;
    message = {
      hello: 'world'
    };
    message_s = JSON.stringify(message);
    default_exchange.publish(test_queue_name, message);
    return console.log("test message published: " + (JSON.stringify(message)) + " to queue: " + test_queue_name);
  };

  count = 0;

  test_message = function(message, headers, properties) {
    console.log("" + ("test message received: routing_key: '" + properties.routingKey + "';") + (" message: " + (JSON.stringify(message))));
    assert.equal(message_s, JSON.stringify(message, "incorrect message content or content_type"));
    return count++;
  };

  firehose_message = function(message, headers, properties) {
    console.log("" + ("firehose message received:  routing_key: '" + properties.routingKey + "';") + (" headers.routing_keys[0]: '" + headers.routing_keys[0] + "';") + (" message: " + (JSON.stringify(message))));
    assert.equal(message_s, JSON.stringify(message, "incorrect message content or content_type"));
    assert.equal(test_queue_name, headers.routing_keys[0], "routing key is not queue name in firehose message headers");
    return count++;
  };

  check_results = function() {
    console.log("" + count + " messages received");
    assert.equal(3, count, "wrong number of messages received");
    return exec("rabbitmqctl trace_off -p " + argv.vhost, function(error, stdout, stderr) {
      if (error != null) {
        console.log(error);
        process.exit(2);
      }
      return process.exit(0);
    });
  };

  default_exchange = {};

  test_queue_name = 'test.firehose.test';

  firehose_queue_name = 'test.firehose.firehose';

  exec("rabbitmqctl trace_on -p " + argv.vhost, function(error, stdout, stderr) {
    var amqp_connection, host, login, options, password, port, vhost;
    if (error != null) {
      console.log(error);
      process.exit(1);
    }
    host = argv.host, port = argv.port, vhost = argv.vhost, login = argv.login, password = argv.password;
    options = {
      host: host,
      port: port,
      vhost: vhost,
      login: login,
      password: password
    };
    amqp_connection = amqp.createConnection(options);
    return amqp_connection.on('ready', function() {
      default_exchange = amqp_connection.exchange();
      return amqp_connection.queue(test_queue_name, function(queue) {
        queue.subscribe(function(message, headers, properties) {
          return test_message(message, headers, properties);
        });
        return amqp_connection.queue(firehose_queue_name, function(queue) {
          return queue.bind("amq.rabbitmq.trace", "#", function() {
            queue.subscribe(function(message, headers, properties) {
              return firehose_message(message, headers, properties);
            });
            setTimeout(check_results, 1000);
            return publish_message();
          });
        });
      });
    });
  });

}).call(this);
