Meteor.startup(function() {
    // register the basicactions module
    Meteor.call('registerModule', {
        name: 'basic-actions',
        callback_enable: 'enable_basicactions_module',
        callback_disable: 'disable_basicactions_module',
        description: 'Includes basic actions for tickets.',
        depends: ['ticket-actions'],
    }, function(error, module_id) {
        if (!error) {

        }
    });
});

Meteor.methods({
    enable_basicactions_module: function(args) {
        args = args || {};
        Hooks.insert({
            hook: 'ticketactions',
            module_id: args.module_id,
            name: 'Edit Groups',
            type: 'ticket',
            staff_only: true,
            callback: 'action_editgroups',
            template: 'action_editgroups'
        });

        Hooks.insert({
            hook: 'ticketactions',
            module_id: args.module_id,
            name: 'Close Tickets',
            type: 'ticketlist',
            staff_only: false,
            callback: 'action_resolvetickets',
            template: 'action_resolvetickets'
        });

        Hooks.insert({
            hook: 'ticketactions',
            module_id: args.module_id,
            name: 'Close Ticket',
            type: 'ticket',
            staff_only: false,
            callback: 'action_resolvetickets',
            template: 'action_resolvetickets'
        });

    },

    disable_basicactions_module: function(args) {
        args = args || {};

        Hooks.remove({
            module_id: args.module_id
        });
    },

    editgroups_action: function(userId, target, groups) {
        return editgroups_action(userId, target, groups);
    },

    resolvetickets_action: function(userId, targets) {
        return resolvetickets_action(userId, targets);
    }
});

editgroups_action = function (userId, target, groups) {
    var user = Meteor.users.findOne({_id: userId});
    var target_ticket = Tickets.findOne({_id: target});

    if (target_ticket !== undefined) {
        target_ticket.groups = groups;
        target_ticket.save();
    }

};

resolvetickets_action = function (userId, targets) {
    var user = Meteor.users.findOne({_id: userId});
    targets.forEach(function (ticket) {
        ticket.status = 'closed';

        ticket.insert_event({
            body: 'Ticket status changed to "closed" by ' + useremail(user._id) + '.',
            update: false
        });

        ticket.save();
    });

};
