var app = angular.module("playbillApp");

app.directive("directory", function() {
  return {
    restrict: "E",
    templateUrl: "/views/directory.html",
    controller: "DirectoryController"
  };
});

app.controller('DirectoryController', ['$scope', '$filter','PlaybillsService',
  function($scope, $filter, PlaybillsService){
    PlaybillsService.list().then(function(data) {
      var sortedPlaybills = $filter('orderBy')(data, "title");
      $scope.glossary = glossary(sortedPlaybills);
    });

    var glossary = function glossary(data) {
      var collection = {};

      data.forEach(function (item) {
        var firstChar = item.title.charAt(0).toUpperCase();
        if(collection[firstChar]) {
          collection[firstChar].push(item.title);
        } else {
          collection[firstChar] = [item.title];
        }
      });

      collection["#"] = [];
      for (var key in collection) {
        if (key.match(/\d/)) {
          collection["#"] = collection['#'].concat(collection[key]);
          delete collection[key];
        }
      }

      return collection;
    };

  }
]);