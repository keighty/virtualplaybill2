var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');

mongoose.connect('mongodb://localhost/virtual_playbill');

var app = express();
app.use(cors());

require('./routes.js')(app);
app.listen(3030);
