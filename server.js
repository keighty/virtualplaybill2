var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var _ = require('underscore');
var Post = require('./models/posts_model.js');

mongoose.connect('mongodb://localhost/virtual_playbill');

var app = express();
app.use(cors());
app.use(bodyParser.json());

require('./routes.js')(app);
app.listen(3030);
