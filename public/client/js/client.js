(function ($) {
    var roomId;
    var $loginForm = $('#login_form');
    var $chat = $('#chat');

    function startChat() {
        $loginForm.hide();
        $chat.show();

        var socket = io.connect("/" + roomId, {query: "username=test&lastMessageId=54b7b22b444735c4032300b4"});
        var $chatBox = $('.chat_box');
        var $messageText = $('.message_text');

        socket.on('init', function (data) {
            $chatBox.html('');
            if (!data.messages) return;
            for (var i = 0; i < data.messages.length; i++) {
                var message = data.messages[i];
                addMessage(message.text)
            }
        });

        socket.on('send:message', function (message) {
            addMessage(message.text)
        });

        function addMessage(text) {
            if (!text || text.trim().length == 0) return;
            $chatBox.append("<div class='message'>" + text + "</div>");
        }

        $('.send_button').click(function (e) {
            e.preventDefault();
            var messageText = $messageText.val();
            $messageText.val('');
            socket.emit('send:message', {message: messageText});
            addMessage(messageText);
        });
    }


    $loginForm.find('.button.ok').click(function (e) {
        e.preventDefault();
        var teamCode = $loginForm.find('.code').val();
        $.get('/api/chat/room/' + teamCode).then(function (res) {
            roomId = res.roomId;
            startChat();
        });
    });
}($));