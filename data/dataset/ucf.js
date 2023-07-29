var fs    = require('fs');
var os    = require('os');
var spawn = require('child_process').spawn;
var path  = require('path');


roto.defineTask('csxs.ucf', function(callback, options) {
	var ucf, args, err;
	var path_tmp     = (os.tmpdir || os.tmpDir)();
	var path_project = process.cwd();
	var path_output  = path.normalize(path_tmp + '/' + path.basename(options.output));
	var path_input   = options.input;

	args = [
		'-jar',
		path.resolve(__dirname, '../../bin/ucf.jar'),
		'-package',
		'-storetype', 'PKCS12',
		'-keystore', options.keystore,
		'-storepass', options.password,
		'-tsa', 'https://timestamp.geotrust.com/tsa',
		path_output,
		'-C', path_input, '.'
	];

	console.log(roto.colorize(options.output, 'white'));
	console.log(roto.colorize('java ' + args.join(' '), 'magenta'));

	ucf = spawn('java', args);
	ucf.stdout.on('data', function (data) { process.stdout.write(data); });
	ucf.stderr.on('data', function (data) { process.stderr.write(data); err = true; });
	ucf.on('exit', function(code) {
		if (err) {
			console.error(roto.colorize('ERROR: ', 'red') + 'Unable to create ZXP package.');
			callback(false);
		} else {
			fs.renameSync(path_output, path.normalize(path_project + '/' + options.output));
			callback();
		}
	});
});