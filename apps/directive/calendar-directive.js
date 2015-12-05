var CalendarDirective = function($filter, PlaybillsService) {
  return {
    restrict: "E",
    templateUrl: "/views/calendar-heatmap.html",
    link: function($scope, element, attrs) {
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
        var oneYearOnly = dates[2015]
        var cal = new CalHeatMap()
        cal.init({
          itemSelector: element[0],
          data: oneYearOnly,
          start: new Date(2015, 0),
          end: new Date(2015, 11),
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
          legend: [1, 2, 3]
        })
      })
    }
  };
}

CalendarDirective.$inject = ['$filter', 'PlaybillsService']

module.exports = CalendarDirective
