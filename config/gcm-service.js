var gcm = require('node-gcm');
var sender = new gcm.Sender('AIzaSyBpRXYncUHxPTJJo0pqblKWZUOCdAzSyVA');

var GCMService = {
  sendNotificacao : function() {
    var message = new gcm.Message();
    message.addData('PEDIDO_NOTIFICATION', "TEXTO");
    // verifica se o REGIG é válido
    if (regId != null && regId != "") {
      sender.send(message, regId, function (err, result) {
        if(err) console.error(err);
        else    console.log(result);
      });
    }
  }
};
module.exports = GCMService;
