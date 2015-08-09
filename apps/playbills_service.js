var app = angular.module("playbillApp");

app.factory("PlaybillsService", function($http) {
  return {
    list: function() {
      return $http.get('/shows').then(function(result) {
        return result.data;
      });
    },
    count: function() {
      return $http.get('/playbill_count').then(function(result) {
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
    },
    editShow: function(show) {
      return $http.post('/edit_post', show).then(function(result) {
        return result.data;
      });
    },
    deleteShow: function(show) {
      return $http.post('/delete_post', show).then(function(result) {
        return result.data;
      });
    }
  };
});

