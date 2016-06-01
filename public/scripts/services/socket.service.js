(function(){
  angular.module('MyApp')
  .factory('socket', socketService);

  socketService.$inject = ['socketFactory']

  function socketService(socketFactory) {
    return socketFactory();
  }

})()
