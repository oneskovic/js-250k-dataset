var module;

Meteor.startup(function() {
	// register the tasks module
	Meteor.call('registerModule', {
		name: 'tasks',
		callback_enable: 'enable_tasks_module',
		callback_disable: 'disable_tasks_module',
		description: 'Allows other module to register tasks.'
	}, function(error, module_id) {
		if (!error) {

		}
	});

    module = Modules.findOne({name: 'tasks'});

    // this should only be set if module is active
    if (module.enabled) {
        var interval = setInterval(process_tasks, 31000);
    }
});

Meteor.methods({
	enable_tasks_module: function(args) {
		args = args || {};
		
	},

	disable_tasks_module: function(args) {
		args = args || {};

	}
});

process_tasks = function() {
    bound_create_event_log({level:'INFO', tags:['tasks'], message:'Starting to process tasks.'});
    tasks.process('tasks', 5, function(task, done){
        var status = global[task.data.callback](task.data.args);
        if (status == true) {
            done();
        } else {
            done('error running task.');
        }
    });
};

check_queue = function(jobname, queue, callback) {
    tasks.client.sort('q:jobs:' + queue
      , 'get', 'q:job:*->data'
      , function(err, jobs) {
        if (jobs.length > 0) {
            job_found = false;
            jobs.forEach(function (job) {
                var data = JSON.parse(job);
                if (data.title == jobname) {
                    job_found = true;
                }
            });
            if (job_found == false) {
                check_next_queue(jobname, queue, callback);
            }
        } else {
            check_next_queue(jobname, queue, callback);
        }
      }
    );
};

check_next_queue = function(jobname, queue, callback) {
    if (queue == 'delayed') {
        check_queue(jobname, 'inactive', callback);
    } else if (queue == 'inactive') {
        check_queue(jobname, 'active', callback);
    } else if (queue == 'active') {
        callback();
    }
}

job_exists = function(jobname, callback) {
    check_queue(jobname, 'delayed', callback);
};
