var app = angular.module("playbillApp", ['ngRoute', 'ui.bootstrap']);

app.run(function($rootScope) {
  $rootScope.user = {};
  $rootScope.show = {};
});
