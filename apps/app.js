var angular = require('angular')
require('ejs')
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

app.run(['$rootScope', 'UserService', 'PlaybillsService', function($rootScope, UserService, PlaybillsService) {
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
