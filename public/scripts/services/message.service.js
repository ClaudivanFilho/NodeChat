(function(){
  angular.module('MyApp')
  .factory('Message', messageService);

  messageService.$inject = ['socket', '$http']

  function messageService(socket, $http) {

    var service = {}
    service.chats = [];
    service.send = send;
    service.subscribe = subscribe;

    getChats();

    return service;

    function subscribe(id) {
      console.log("subscribed to chat-" + id);
      socket.on('chat-' + id, function (msg) {
        if (msg.sender == msg.receiver)
          return;
        addMsgChatToChats(msg);
      });
    }

    function addMsgChatToChats(msg) {
      var indice = getIndexOfChatBetweenTwoUsers(msg.sender, msg.receiver);
      if (indice) {
        service.chats[indice].messages.push(msg.message);
      } else {
        console.log("not found chat yet");
        var obj = {};
        obj.user1_id = msg.sender;
        obj.user2_id = msg.receiver;
        obj.messages = [];
        obj.messages.push(msg.message);
        service.chats.push(obj);
      }
    }

    function getIndexOfChatBetweenTwoUsers(sender, receiver) {
      for (var i = 0; i < service.chats.length; i++) {
        var user1 = service.chats[i].user1_id;
        var user2 = service.chats[i].user2_id;
        if ((sender == user1 && receiver == user2) || (sender == user2 && receiver == user1)) {
            return i;
        }
      }
      return null;
    }

    function send(sender, receiver, msg) {
      var obj = {
        sender : sender,
        receiver : receiver,
        message : msg
      };
      socket.emit('chat message', obj);
      addMsgChatToChats(obj);
    }

    function getChats() {
      $http.get('/chats', [])
      .success(function(response) {
        service.chats = response;
      })
      .error(function(data) {
        console.log(data);
      });
    }
  }
})()
