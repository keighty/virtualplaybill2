module.exports = function() {
  return {
    restrict: "E",
    templateUrl: "/views/cast_form.html",
    link: function($scope, element, attrs) {
      $scope.addNewActor = function() {
        var itemNo = $scope.show.cast.length;
        $scope.show.cast.push({'name': '' , 'index': itemNo});
      };

      $scope.removeActor = function(index) {
        $scope.show.cast.splice(index, 1);
      };
    }
  };
}
