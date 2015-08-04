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
      var collection = {'#': []};

      data.forEach(function (item) {
        var firstChar = item.title.charAt(0).toUpperCase();

        if(firstChar.match(/\d/)) {
          collection['#'].push(item);
        } else {
          stringTitle(firstChar, item);
        }

      });

      function stringTitle(char, item) {
        if(collection[char]) {
          collection[char].push(item);
        } else {
          collection[char] = [item];
        }
      };

      return collection;
    };

  }
]);