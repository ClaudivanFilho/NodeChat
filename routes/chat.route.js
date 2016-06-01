var express = require('express');
var router = express.Router();
var passport = require('passport');
var Chat = require('../models/chat.model.js');

router.get('/chats', function(req, res, next) {
  Chat.find({ $or:[{'user1_id':req.user.id}, {'user2_id':req.user.id}]}, function(err, chats) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(chats, null, 3));
  });
});

module.exports = router;
