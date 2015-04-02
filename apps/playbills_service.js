var app = angular.module("playbillApp");

app.factory("PlaybillsService", function($http) {
  return {
    list: function() {
      return $http.get('/playbills').then(function(result) {
        return result.data;
      });
    },
    show: function(showId) {
      return $http.get('playbill/' + showId).then(function(result) {
        return result.data;
      });
    },
    newShow: function(show) {
      return $http.post('/new_post', show).then(function(result) {
        return result.data;
      });
    }
  };
});

