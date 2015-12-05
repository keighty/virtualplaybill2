module.exports = function() {
  return {
    restrict: "E",
    templateUrl: "/views/calendar.html",
    link: function($scope, element, attrs, PlaybillsService) {
      console.log("hello calendar")
    }
  };
}
