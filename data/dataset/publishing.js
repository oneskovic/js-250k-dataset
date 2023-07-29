Meteor.publish('user', function (_id) {
    return Meteor.users.find({_id: _id},
        {
            fields: { username: 1, _id: 1 }
        });
});

Meteor.publish('users', function () {
    return Meteor.users.find();
});

Meteor.publish('videos', function () {
    return UserVideos.find();
});

Meteor.publish('video', function (userId) {
    return UserVideos.findOne({ userId: userId });
});


Meteor.publish('audios', function () {
    return UserAudios.find();
});

Meteor.publish('audio', function (userId) {
    return UserAudios.findOne({ userId: userId });
});


Meteor.startup(function () {

});