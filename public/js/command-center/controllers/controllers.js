'use strict';

var current_username;

/* Controllers */

function AppCtrl($scope, socket) {
  // Socket listeners
  // ================

  socket.on('init', function (data) {
    current_username =  data.name;
    $scope.name = data.name;
    $scope.users = data.users;
  });

  socket.on('send:message', function (message) {
    var mention, me;
    mention = getMention(message.text);
    if(mention) {
      me = "active"
    } else {
      me = null;
    }
    $scope.messages.push({
      user: message.user,
      text: message.text,
      me: me
      });
  });

  socket.on('user:join', function (data) {
    $scope.messages.push({
      user: 'chatroom',
      text: 'User ' + data.name + ' has joined.'
    });
    $scope.users.push(data.name);
  });

  // add a message to the conversation when a user disconnects or leaves the room
  socket.on('user:left', function (data) {
    $scope.messages.push({
      user: 'chatroom',
      text: 'User ' + data.name + ' has left.'
    });
    var i, user;
    for (i = 0; i < $scope.users.length; i++) {
      user = $scope.users[i];
      if (user === data.name) {
        $scope.users.splice(i, 1);
        break;
      }
    }
  });

  // Check if message has a mention for current user
  var getMention = function(message) {
    var text,pattern,mention;
    text = message;
    pattern = /\B\@([\w\-]+)/gim;
    mention = text.match(pattern);

    if(mention){
      mention = String(mention).split("@")[1];
      if(mention === current_username) return mention;
    }

    return false;
  };

  // Methods published to the scope
  // ==============================
  $scope.mention = function (name) {
      $scope.message = '@' + name + ' ';
      $('.input-message').focus()
  };

  $scope.messages = [];
  $scope.sendMessage = function () {
    socket.emit('send:message', {
      message: $scope.message
    });

    // add the message to our model locally
    $scope.messages.push({
      user: $scope.name,
      text: $scope.message
    });

    // clear message box
    $scope.message = '';
  };

}
