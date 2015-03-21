var app = angular.module("playbillApp");

app.controller('UserController', ['$rootScope', '$scope', '$http',
  function($rootScope, $scope, $http) {
    $http.get('/user/profile').success(function(data) {
      $rootScope.user = data;
      $scope.error = "";
    }).error(function(data) {
      $scope.error = data;
    });
  }
]);