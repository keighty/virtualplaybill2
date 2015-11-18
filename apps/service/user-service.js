module.exports = function($http) {
  return {
    current_user: function() {
      return $http.get('/user/profile').then(function(result) {
        return result.data;
      });
    }
  };
}
