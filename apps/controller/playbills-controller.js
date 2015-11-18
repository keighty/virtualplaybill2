module.exports = function($scope, PlaybillsService) {
  PlaybillsService.list().then(function(data) {
    $scope.playbills = data;
  });
}
