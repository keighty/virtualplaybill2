var app = angular.module("playbillApp");

app.controller('DirectoryController', ['$scope', '$filter','PlaybillsService', require('./directory-controller.js')])
app.controller('AllPlaybillsController', ['$scope', 'PlaybillsService', require('./playbills-controller.js')])
app.controller('ShowController', ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'PlaybillsService', require('./show-controller.js')])
