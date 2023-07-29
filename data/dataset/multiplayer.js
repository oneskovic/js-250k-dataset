var multiplayer = multiplayer || {};
var utilities = utilities || {};


/**
 * Resets all realtime rooms for the current game.
 */
multiplayer.resetAllRealtimeRooms = function() {
  gapi.client.gamesManagement.rooms.resetForAllPlayers().execute(
      function(resp) {
        console.log('Reset all rooms for current game');
        console.log(resp);

        utilities.checkApiResponseAndNotify(resp,
            'Rooms reset for all players.');
      });
};


/**
 * Resets all realtime rooms for the current player.
 */
multiplayer.resetMyRealtimeRooms = function() {
  gapi.client.gamesManagement.rooms.reset().execute(function(resp) {
    console.log('Reset all rooms for current player');
    console.log(resp);

    utilities.checkApiResponseAndNotify(resp,
        'Room reset for current player.');
  });
};


/**
 * Resets all turnbased rooms for the current game.
 */
multiplayer.resetAllTurnbasedRooms = function() {
  gapi.client.gamesManagement.turnBasedMatches.resetForAllPlayers().execute(
      function(resp) {
        console.log('Reset turnbased rooms for all players');
        console.log(resp);

        utilities.checkApiResponseAndNotify(resp,
            'Turn-based rooms reset for all players.');
      });
};


/**
 * Resets all turnbased rooms for the current player.
 */
multiplayer.resetMyTurnbasedRooms = function() {
  gapi.client.gamesManagement.turnBasedMatches.reset().execute(function(resp) {
    console.log('Reset turnbased rooms for current player');
    console.log(resp);
    utilities.checkApiResponseAndNotify(resp,
        'Turn-based room reset for current player.');
  });
};
