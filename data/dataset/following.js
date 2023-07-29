var FollowingAPI = require('oae-following');
var FollowingConstants = require('oae-following/lib/constants').FollowingConstants;

var MixpanelUtil = require('oae-mixpanel/lib/util');

module.exports = function(client) {

    /*!
     * Following a user
     */
    MixpanelUtil.listen(FollowingAPI, FollowingConstants.events.FOLLOW, function(ctx, follower, followedUser) {
        var params = MixpanelUtil.getBasicParameters(ctx);
        params.followed = followedUser.id;
        client.track(FollowingConstants.events.FOLLOW, params);
        client.people.increment(params.distinct_id, FollowingConstants.events.FOLLOW);
    });

    /*!
     * Unfollowing a user
     */
    MixpanelUtil.listen(FollowingAPI, FollowingConstants.events.UNFOLLOW, function(ctx, follower, unfollowedUserId) {
        var params = MixpanelUtil.getBasicParameters(ctx);
        params.unfollowed = unfollowedUserId;
        client.track(FollowingConstants.events.UNFOLLOW, params);
        client.people.increment(params.distinct_id, FollowingConstants.events.UNFOLLOW);
    });

    /*!
     * Getting the users that are following a user
     */
    MixpanelUtil.listen(FollowingAPI, FollowingConstants.events.GET_FOLLOWERS, function(ctx, userId, start, limit, users) {
        var params = MixpanelUtil.getBasicParameters(ctx);
        params.start = start || 0;
        client.track(FollowingConstants.events.GET_FOLLOWERS, params);
        client.people.increment(params.distinct_id, FollowingConstants.events.GET_FOLLOWERS);
    });

    /*!
     * Getting the users that a user is following
     */
    MixpanelUtil.listen(FollowingAPI, FollowingConstants.events.GET_FOLLOWING, function(ctx, userId, start, limit, users) {
        var params = MixpanelUtil.getBasicParameters(ctx);
        params.start = start || 0;
        client.track(FollowingConstants.events.GET_FOLLOWING, params);
        client.people.increment(params.distinct_id, FollowingConstants.events.GET_FOLLOWING);
    });
};
