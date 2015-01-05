'use strict';

var current_username;

function AppCtrl($scope, socket) {
  // Socket listeners
  // ================

  socket.on('init', function (data) {
    current_username =  data.name;
    $scope.name = data.name;

    console.log('123123123');

    if (!data.messages) return;
    for (var i = 0; i < data.messages.length; i++) {
      var message = data.messages[i];
      addMessage(message.text)
    }
    //text/name
    //$scope.users = data.users;
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

  function addMessage(text) {
    $chatBox.append("<div class='message'>" + text + "</div>");
  }

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
