var Chat = require('../models/chat.model.js');

module.exports = function(http){
  var io = require('socket.io')(http);

  io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      Chat.findOne(
        {$or:[
          {$and:[{'user1_id' : msg.sender}, {'user2_id' : msg.receiver}]},
          {$and:[{'user2_id' : msg.sender}, {'user1_id' : msg.receiver}]}
        ]}, function(err, chat) {
          if (chat) {
            chat.messages.push(msg.message);
            chat.save();
          } else {
            var chat = new Chat({
              user1_id : msg.sender,
              user2_id : msg.receiver,
              messages : []
            });
            chat.messages.push(msg.message);
            chat.save();
          }
        }
      );
      io.emit('chat-' + msg.receiver, msg);
    });
  });

  return http;
}
