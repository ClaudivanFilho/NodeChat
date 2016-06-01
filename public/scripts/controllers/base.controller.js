(function() {
  angular.module('MyApp', ['btford.socket-io'])
  .controller('BaseCtrl', BaseCtrl);

  BaseCtrl.$inject = ['User', 'Message'];

  function BaseCtrl(User, Message) {
    var ba = this;

    ba.user = User;
    ba.chat = Message;
    ba.receiver = null;
    ba.message = "";

    ba.selectReceiver = function(receiver) {
      ba.receiver = receiver;
    }

    ba.isTheActualChat = function(chat) {
      if (!ba.receiver) {
        return false;
      }
      return (ba.user.data.id == chat.user1_id && ba.receiver.id == chat.user2_id) ||
        (ba.user.data.id == chat.user2_id && ba.receiver.id == chat.user1_id);
    }

    ba.send = function() {
      if (!ba.receiver) {
        alert("Select a receiver!")
      } else {
        var userName = ba.user.data.displayName;
        var msg = {
          name : userName ? userName : "Anônimo",
          msg : ba.message,
        }
        Message.send(ba.user.data.id, ba.receiver.id, msg);
        ba.message = "";
      }
    }
  }
})()
