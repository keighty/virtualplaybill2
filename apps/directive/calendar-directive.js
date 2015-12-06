var CalendarDirective = function($filter, PlaybillsService) {
  return {
    restrict: "E",
    templateUrl: "/views/calendar-heatmap.html",
    scope: {
      year: '=year'
    },
    link: function($scope, element, attrs) {
      var calendarOptions = {
        itemSelector: element[0],
        cellSize: 15,
        cellRadius: 2,
        domain: "month",
        subDomain: "x_day",
        displayLegend: false,
        verticalOrientation: true,
        label: {
          position: 'top'
        },
        weekStartOnMonday: false,
        highlight: 'now',
        legend: [1, 2, 3],
        itemName: ["show", "shows"],
        subDomainTitleFormat: {
          empty: "No shows on {date}",
          filled: "{count} {name} on {date}"
        },
      }

      PlaybillsService.list().then(function (shows) {
        return $filter('orderBy')(shows, 'showDate')
      })
      .then(function (shows) {
        var dates = {}
        shows.forEach(function (show) {
          var fullShowDate = new Date(show.showDate)
          var year = fullShowDate.getFullYear()
          var iShowDate = Date.parse(show.showDate)/1000

          if (dates[year]) {
            if(dates[year][iShowDate]) dates[year][iShowDate]++
            else dates[year][iShowDate] = 1
          } else {
            var temp = {}
            temp[iShowDate] = 1
            dates[year] = temp
          }
        })
        return dates
      })
      .then(function (dates) {
        calendarOptions.data = dates[$scope.year]
        calendarOptions.start = new Date($scope.year, 0)
        calendarOptions.end = new Date($scope.year, 11)

        var cal = new CalHeatMap()
        cal.init(calendarOptions)
      })
    }
  };
}

CalendarDirective.$inject = ['$filter', 'PlaybillsService']

module.exports = CalendarDirective
