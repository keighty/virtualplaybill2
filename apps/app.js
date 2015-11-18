var angular = require('angular')
require('angular-route')
require('s3upload')
require('pagination')
require('datepicker')
require('disqus')

var app = angular.module("playbillApp", ['ngRoute', 'ui.bootstrap', 'angularUtils.directives.dirPagination', 'angularUtils.directives.dirDisqus']);

require('./user_service.js')
require('./playbills_service.js')
require('./playbills.js')
require('./routes.js')
require('./directory.js')
require('./cast.js')
require('./image_upload.js')
require('./rating.js')

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
