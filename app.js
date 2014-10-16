var playbills = angular.module("playbillApp", []);

function PlaybillController($scope, $http) {
  (function getPlaybills() {
    var playbillUrl = 'http://localhost:3030/playbills';
    $http.get(playbillUrl).success(function(data) {
      $scope.playbills = data;
      $scope.playbillRows = partition(data, 3);
    }).error(function(response) {
      console.log(response.message);
    });
  })();

  function partition(input, size) {
    var rows = [];
    for (var i=0; i < input.length; i+=size) {
      rows.push(input.slice(i, i+size));
    }
    return rows;
  }
}

function NewPlaybillController($scope, $http) {
  $scope.addPlaybill = function() {
    console.log("hello");
  };
}
