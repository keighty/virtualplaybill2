var app = angular.module("playbillApp");

app.factory("PlaybillsService", function($http) {
  return {
    list: function() {
      return $http.get('/playbills').then(function(result) {
        return result.data;
      });
    }
  };

});