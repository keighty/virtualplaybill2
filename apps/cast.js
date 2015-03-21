var app = angular.module("playbillApp");

app.directive("castshow", function() {
  return {
    restrict: "E",
    templateUrl: "/views/cast_show.html",
    controller: "CastController"
  };
});

app.directive("castform", function() {
  return {
    restrict: "E",
    templateUrl: "/views/cast_form.html",
    controller: "CastController"
  };
});

app.controller('CastController', ['$scope',
  function($scope){
    $scope.addNewActor = function() {
      var itemNo = $scope.show.cast.length;
      $scope.show.cast.push({'name': '' , 'index': itemNo});
    };

    $scope.removeActor = function(index) {
      $scope.show.cast.splice(index, 1);
    };

    $scope.emptyCast = function() {
      return $scope.show.cast && $scope.show.cast.length === 0;
    };
  }
]);
