var app = angular.module("playbillApp");

app.controller('UserController', ['$rootScope', '$scope', '$http', 'UserService',
  function($rootScope, $scope, $http, UserService) {
    UserService.current_user().then(function(data) {
      $rootScope.user = data;
    }).catch(function(err) {
      $scope.error = err;
    });
  }
]);