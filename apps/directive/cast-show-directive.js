module.exports = function() {
  return {
    restrict: "E",
    templateUrl: "/views/cast_show.html",
    link: function($scope, element, attrs) {
      $scope.emptyCast = function() {
        return $scope.show.cast && $scope.show.cast.length === 0;
      };
    }
  };
}
