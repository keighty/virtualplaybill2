var app = angular.module("playbillApp", ['ngRoute', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);

app.run(function($rootScope, UserService, PlaybillsService) {
  UserService.current_user().then(function(data) {
    $rootScope.user = data;
  }).catch(function(err) {
    $rootScope.error = err;
  });

  PlaybillsService.count().then(function(data) {
    $rootScope.count = data;
  });

  $rootScope.show = {};
});
