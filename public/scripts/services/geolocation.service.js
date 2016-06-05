(function(){
angular.module('MyApp')
.factory('geolocation', geoLocationService);

geoLocationService.$inject = ['$rootScope']

function geoLocationService($rootScope) {

  var service = {};
  service.data = null;
  service.distance = null;
  service.refreshPosition = refreshPosition;
  return service;

  function refreshPosition(callback) {
    navigator.geolocation.getCurrentPosition(
      function(data) {
        $rootScope.$apply(function() {
          if (service.data) {
            service.distance = distance(
              service.data.coords.longitude,
              service.data.coords.latitude,
              data.coords.longitude,
              data.coords.latitude);
            }
            service.data = data;
        });
        callback();
        },
        function(data) {
          // error handler
        }, {
          enableHighAccuracy: true,
          timeout: 0,
          maximumAge: Infinity
        }
      );
    }

    function distance(lon1, lat1, lon2, lat2) {
      var R = 6371; // Radius of the earth in km
      var dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
      var dLon = (lon2 - lon1) * Math.PI / 180;
      var a =
      0.5 - Math.cos(dLat)/2 +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      (1 - Math.cos(dLon))/2;

      return (R * 2 * Math.asin(Math.sqrt(a)))/1000;
    }
  }
})()
