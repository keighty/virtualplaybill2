var app = angular.module("playbillApp");
app.config(['$routeProvider', '$locationProvider', require('./routes.js')])
