var app = angular.module("playbillApp");

app.factory('UserService', require('./user-service.js'))
app.factory("PlaybillsService", require('./playbills-service.js'))
