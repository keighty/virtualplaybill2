var app = angular.module("playbillApp", ['ngRoute', 'ui.bootstrap']);

app.run(function($rootScope, UserService) {
  UserService.current_user().then(function(data) {
    $rootScope.user = data;
  }).catch(function(err) {
    $rootScope.error = err;
  });
  $rootScope.show = {};
});
