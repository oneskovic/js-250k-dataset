"use strict";

var friendsTable = friendsTable || {};
friendsTable.pageTokens = [''];
friendsTable.currPage = 0;

friendsTable.showBuddies = function() {
  friendsTable.loadUpFriends(0);
  $('#pageHeader').text('People in your circles');
};

friendsTable.showNext = function() {
  friendsTable.loadUpFriends(friendsTable.currPage + 1);
};

friendsTable.showPrev = function() {
  friendsTable.loadUpFriends(friendsTable.currPage - 1);
};

friendsTable.clearData = function() {
  friendsTable.clearOut();
};

friendsTable.loadUpFriends = function(pageNum)
{
  friendsTable.clearOut();
  friendsTable.currPage = pageNum;

  if (pageNum >0 && pageNum < friendsTable.pageTokens.length) {
    var optionalPageToken = friendsTable.pageTokens[pageNum];
  }

  // For an interesting twist, try changing this to 'best'
  var paramsObject = {collection: 'visible',
                      orderBy : 'alphabetical',
                      userId : 'me',
                      maxResults: 20};
  if (optionalPageToken) paramsObject.pageToken = optionalPageToken;

  var request = gapi.client.plus.people.list(paramsObject);
  request.execute(function(response) {
    console.log('This is friends data: ', response);
    var $friendTableBody = $('#friendsTable tbody');
    if (response.hasOwnProperty('items')) {
      for (var i=0; i<response.items.length; i++) {
        var $personRow = friendsTable.buildTableRowFromData(response.items[i]);
        $personRow.appendTo($friendTableBody);
      }
      if (response.hasOwnProperty('nextPageToken')) {
        friendsTable.pageTokens[pageNum + 1] = response.nextPageToken;
      }
      friendsTable.refreshPageButtons();
    }
    $('#friends').fadeIn();
  });
};

friendsTable.refreshPageButtons = function()
{
  $('#pageFriendsNext').prop('disabled', (friendsTable.currPage +1) >= friendsTable.pageTokens.length);
  $('#pageFriendsPrev').prop('disabled', friendsTable.currPage  <= 0);

};

friendsTable.buildTableRowFromData = function(rowObj) {
  var $tableRow = $('<tr></tr>');
  // TODO: Add link to their profile
  var $nameCell = $('<td></td>').append(($('<a></a>')).prop('href',rowObj.url).text(rowObj.displayName));
  var $iconCell = $('<td></td>').append($('<img />')
      .prop('src', rowObj.image.url));

  $tableRow.append($iconCell).append($nameCell);

  return $tableRow;

};


friendsTable.clearOut = function() {
  $('#friendsTable tbody').html('');
};

friendsTable.goBack = function() {
  $('#friends').hide();
  welcome.loadUp();

};