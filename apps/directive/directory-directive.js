var app = angular.module("playbillApp");
app.directive("directory", function() {
  return {
    restrict: "E",
    templateUrl: "/views/directory.html",
    controller: "DirectoryController"
  };
});