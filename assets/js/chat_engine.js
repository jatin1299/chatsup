
class ChatEngine{
    constructor(chatBoxId, userName){
        this.chatBox = $(`#${chatBoxId}`);
        this.userName = userName;

        this.socket = io.connect(`http://localhost:5000`);
        if (this.userName){
            this.connectionHandler();
        }

    }


    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');


            self.socket.emit('join_room', {
                user_name: self.userName,
                chatroom: 'ChatsUP'
            });

            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
            })


        });

        // URL = 'http://localhost:5000';
        // window.location.href = URL;
        $('#name-btn').click(function(){          
            URL = `http://localhost:5000`;
            window.location = URL;
        });
        if(window.location.href.includes(`http://localhost:3000`)){
            $('#user-chat-box').hide();
        }
        if(window.location.href.includes(`http://localhost:5000`)){
            $('#start-chat').hide();
            $('#user-chat-box').show();
            // if click on sign-out button redirect back to localhost:3000/users/sign-in
            $('#sign-out').click(function(){
                URL = `http://localhost:${PORT}/users/sign-in`;
                window.location = URL;
            });
        }
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_name: self.userName,
                    chatroom: 'ChatsUP'
                });
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);


            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_name == self.userName){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_name
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
            $('#chat-messages-list').scrollTop($("#chat-messages-list").outerHeight());
        })
    }
}