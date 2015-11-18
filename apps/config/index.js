var app = require('angular').module("playbillApp");
app.config(['$routeProvider', '$locationProvider', require('./routes.js')])
