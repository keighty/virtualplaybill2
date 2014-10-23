var playbills = angular.module("playbillApp", []);

playbills.controller('PlaybillController', ['$scope', '$http',
  function($scope, $http) {
    $http.get('/playbills').success(function(data) {
      $scope.playbills = data;
      $scope.playbillRows = partition(data, 3);
    }).error(function(res) {
      console.log(res);
    });

    function partition(input, size) {
      var rows = [];
      for (var i=0; i < input.length; i+=size) {
        rows.push(input.slice(i, i+size));
      }
      return rows;
    }
  }
]);

playbills.controller('NewPlaybillController', ['$scope', '$http',
  function($scope, $http) {
    $scope.addPlaybill = function(show) {
      var addPlaybillUrl = 'http://localhost:3030/new_post';
      $http.post(addPlaybillUrl, show)
           .success(function(err, res) {
            console.log(res);
           });
    };
  }
]);
