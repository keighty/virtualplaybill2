var app = angular.module("playbillApp");

app.directive("showdetails", function() {
  return {
    restrict: "E",
    templateUrl: "/views/show_details.html",
    controller: "ShowController"
  };
});

app.directive("showunit", function() {
  return {
    restrict: "E",
    templateUrl: "/views/show_unit.html",
    controller: "ShowController"
  };
});

app.directive("showform", function() {
  return {
    restrict: "E",
    templateUrl: "/views/show_form.html",
    controller: "ShowController"
  };
});