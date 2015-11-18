var app = angular.module("playbillApp");

app.directive("castshow", require('./cast-show-directive.js'))
app.directive("castform", require('./cast-form-directive.js'))
app.directive("imageupload", require('./image-upload-directive.js'))
app.directive('starRating', require('./rating-directive.js'))
app.directive("directory",require('./directory-directive.js'))
app.directive("showdetails", require('./show-details-directive.js'))
app.directive("showunit", require('./show-unit-directive.js'))
app.directive("showform", require('./show-form-directive.js'))
