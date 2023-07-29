action_resolvetickets = function(ticketList) {
  if ($('.resolveticketscontainer').length == 0) {
    UI.insert(UI.render
      (Template['action_resolvetickets']),
      $('.container').get(0)
    );
  } else {
    Session.set("showResolveticketsDialog", true);
  }
  Session.set('resolveticketslist', ticketList);
};

Template.action_resolvetickets.created = function() {
    Session.set("showResolveticketsDialog", true);
    Session.set('resolveticketslist', []);
};

Template.action_resolvetickets.helpers({
    showResolveticketsDialog: function() {
        return Session.get("showResolveticketsDialog");
    }
});

Template.resolveticketsdialog.helpers({
    tickets: function() {
        return Tickets.find(
            {_id: {$in: Session.get('resolveticketslist')}},
            {sort: {'created': 1}}
        );
    }
});

Template.resolveticketsdialog.events({
  'click .cancel': function (event, template) {
    event.preventDefault();
    Session.set("showResolveticketsDialog", false);
  },

  'click .resolve': function (event, template) {
    event.preventDefault();

    var tickets = Session.get('resolveticketslist')

    Meteor.call('resolvetickets_action', Meteor.userId(), tickets, function (error) {
        if (!error) {

        }
    });

    Session.set("showResolveticketsDialog", false);
  }
});
