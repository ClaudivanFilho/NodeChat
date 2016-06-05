(function() {
  angular.module('MyApp', ['btford.socket-io'])
  .controller('BaseCtrl', BaseCtrl);

  BaseCtrl.$inject = ['User', 'Message', '$timeout', '$rootScope', 'geolocation'];

  function BaseCtrl(User, Message, $timeout, $rootScope, geolocation) {
    var ba = this;

    ba.user = User;
    ba.chat = Message;
    ba.receiver = null;
    ba.message = "";
    ba.distance = null;
    ba.refreshPosition = refreshPosition;
    ba.findUsersInRange = findUsersInRange;
    ba.location = geolocation;

    ba.refreshPosition();

    $rootScope.$on('user-loaded', function(event, id) {
      Message.subscribe(id);
    });

    function findUsersInRange() {
      console.log(ba.distance);
      User.getUsersInRange(ba.distance);
    }

    function refreshPosition() {
      geolocation.refreshPosition(function() {
        var obj = {};
        obj.location = [
          ba.location.data.coords.longitude,
          ba.location.data.coords.latitude
        ];
        User.edit(obj);
      });
    }

    ba.selectReceiver = function(receiver) {
      ba.receiver = receiver;
      ba.scrollToLast();
    }

    ba.scrollToLast = function() {
      $timeout(function() {
        $('#chats').animate({
          scrollTop:$('#chat-container').height()
        }, 300);
      }, 150);
    }

    ba.isTheActualChat = function(chat) {
      if (!ba.receiver) {
        return false;
      }
      return (ba.user.data.id == chat.user1_id && ba.receiver.id == chat.user2_id) ||
        (ba.user.data.id == chat.user2_id && ba.receiver.id == chat.user1_id);
    }

    ba.send = function(i) {
      if (!ba.receiver) {
        alert("Select a receiver!")
      } else if (!ba.message) {
        return;
      } else {
        var userName = ba.user.data.displayName;
        var msg = {
          name : userName ? userName : "Anônimo",
          msg : ba.message,
        }
        Message.send(ba.user.data.id, ba.receiver.id, msg);
        ba.message = "";
      }
      ba.scrollToLast();
    }
  }
})()
