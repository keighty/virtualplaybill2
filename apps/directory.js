var app = angular.module("playbillApp");

app.directive("directory", function() {
  return {
    restrict: "E",
    templateUrl: "/views/directory.html",
    controller: "DirectoryController"
  };
});

app.controller('DirectoryController', ['$rootScope', '$scope', '$http', '$routeParams',
  function($rootScope, $scope, $http, $routeParams){
    console.log("hello directory");
  }

]);