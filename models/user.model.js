var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  id : String,
  provider : String,
  displayName : String,
  emails : [
    {
      value : String,
      type : String
    }
  ],
  photos : [
    {
      value : String
    }
  ]
});

var User = mongoose.model('User', userSchema);
module.exports = User;
