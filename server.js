/************
** Libraries
*************/
var express = require('express');
var expressSession = require('express-session');
var http = require('http');
var path = require('path');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var uriUtil = require('mongodb-uri');
var uuid = require('node-uuid');
var favicon = require('serve-favicon')

/*********************
** Database connection
*********************/
var mongoose = require('mongoose');
var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/virtual_playbill';
var mongooseUri = uriUtil.formatMongoose(mongoUri);
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

mongoose.connect(mongooseUri, options);
var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));

var mongoStore = require('connect-mongo')({session: expressSession});

/********
** Models
*********/
var User = require('./models/users_model.js');

/*************
** App options
**************/
var app = express();
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

var expressSession = expressSession({
  genid: function(req) {
    return uuid.v1()
  },
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
})

app.use(expressSession);
app.use('/views', express.static('./views', {maxAge: '30 days'}));
app.use('/static', express.static('./static', {maxAge: '30 days'}));
app.use('/images', express.static('./static/images',{maxAge: '30 days'}));
app.use('/lib', express.static('./lib', {maxAge: '30 days'}));
app.use('/dist', express.static('./dist'));
app.use(favicon('./static/images/favicon.ico'))

/*************
** Routes Init
**************/
require('./routes.js')(app);

/************
** App server
*************/

conn.once('open', function() {
  var port = process.env.PORT || 3030;
  app.listen(port);
  console.info("MongoURI", mongoUri);
  console.log('Express server listening on port ' + port);
});
