var angular = require('angular')
require('angular-route')
require('s3upload')
require('pagination')
require('datepicker')
require('datepicker-tpls')
require('disqus')

var app = angular.module("playbillApp", ['ngRoute', 'ui.bootstrap', 'angularUtils.directives.dirPagination', 'angularUtils.directives.dirDisqus']);

require('./config')
require('./service')
require('./controller')
require('./directive')

app.run(['$rootScope', 'UserService', 'PlaybillsService', 'CollectionService', function($rootScope, UserService, PlaybillsService, CollectionService) {

  $rootScope.$on('$routeChangeStart', function (evt, nextRoute) {
    newrelic && newrelic.interaction().setName(nextRoute.$$route.originalPath)
  })

  angular.element('.loading-gif').addClass('hidden')
  UserService.current_user().then(function(data) {
    $rootScope.user = data;
  }).catch(function(err) {
    $rootScope.error = err;
  });

  PlaybillsService.count().then(function(data) {
    $rootScope.count = data;
  });

  $rootScope.show = {};
}])
