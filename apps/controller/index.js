var app = angular.module("playbillApp");

app.controller('DirectoryController', require('./directory-controller.js'))
app.controller('AllPlaybillsController', require('./playbills-controller.js'))
app.controller('ShowController', require('./show-controller.js'))
app.controller('CalendarController', require('./calendar-controller.js'))
