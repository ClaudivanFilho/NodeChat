(function(){
angular.module('MyApp')
.factory('User', userService);

userService.$inject = ['$http', '$rootScope']

function userService($http, $rootScope) {

  var service = {}

  service.data = [];
  service.users = [];

  service.get = get;
  service.getAll = getAll;
  service.get();
  service.getAll();
  return service;

  function get() {
    $http.get('/user', [])
    .success(function(response) {
      $rootScope.$broadcast('user-loaded', response.id);
      service.data = response;
    })
    .error(function(data) {
      console.log(data);
    });
  }

  function getAll() {
    $http.get('/users', [])
    .success(function(response) {
      service.users = response;
    })
    .error(function(data) {
      console.log(data);
    });
  }
}
})()
