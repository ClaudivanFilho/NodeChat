var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatSchema = new Schema({
  user1_id : String,
  user2_id : String,
  messages : [{
    name : String,
    msg : String
  }]
});

var Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
