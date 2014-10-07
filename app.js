var playbills = angular.module("playbillApp", []);

function PlaybillController($scope, $http) {
  $scope.playbills = function() {
    var playbillUrl = 'http://localhost:3030/playbills';
    $http.get(playbillUrl).success(function(data) {
      $scope.playbills = data;
    }).error(function(response) {
      console.log(response.message);
    });
  };

  $scope.playbills();
}
