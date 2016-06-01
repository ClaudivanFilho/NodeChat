var mongoose = require('mongoose');
var opts = {
  server: { socketOptions: { keepAlive: 1 } }
};

module.exports = function(app){
  return {
    connect : function() {
      switch(app.get('env')){
        case 'development':
          mongoose.connect('mongodb://localhost/mydb', opts);
          break;
        case 'production':
          // TODO have to be seted
          mongoose.connect('mongodb://vanfilho:nodebase1@ds061385.mlab.com:61385/heroku_bnl381w2', opts);
          break;
        default:
          throw new Error('Unknown execution environment: ' + app.get('env'));
      }
    }
  }
};
