var app = angular.module("playbillApp");

app.directive('starRating', function () {
    return {
      restrict: 'E',
      template: '<ul class="rating">' +
                  '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
                    '\u2605' +
                  '</li>' +
                '</ul>',
      scope: {
        ratingValue: '=',
        readonly: '@',
        onRatingSelected: '&',
        show: '='
      },
      link: function (scope, elem, attrs) {
        var numberOfStars = 5;

        var updateStars = function() {
          scope.stars = [];
          for (var  i = 0; i < numberOfStars; i++) {
            scope.stars.push({filled: i < scope.ratingValue});
          }
        };

        scope.toggle = function(index) {
          if (scope.readonly && scope.readonly === 'true') {
            return;
          }
          scope.ratingValue = index + 1;
          scope.onRatingSelected({rating: index + 1});
        };

        scope.$watch('show', function(oldVal, newVal) {
          if (newVal) {
            updateStars();
          }
        });

        scope.$watch('ratingValue', function(oldVal, newVal) {
          if (newVal) {
            updateStars();
          }
        });
      }
    };
  });