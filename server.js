/************
** Libraries
*************/
require('newrelic');
var express = require('express');
var expressSession = require('express-session');

var http = require('http');
var path = require('path');

var partials = require('express-partials');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');

var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');

/*********************
** Database connection
*********************/
var mongoStore = require('connect-mongo')({session: expressSession});
var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/virtual_playbill';
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

console.info("MongoURI", mongoUri);
var mongooseUri = uriUtil.formatMongoose(mongoUri);

mongoose.connect(mongooseUri, options);
var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));

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
app.use(expressSession({
  secret: 'SECRET',
  cookie: {maxAge: 60*60*1000},
  store: new mongoStore({
    db: mongoose.connection.db,
    collection: 'sessions'
  }),
  resave: true,
  saveUninitialized: true
}));

app.use('/apps', express.static('./apps'));
app.use('/views', express.static('./views'));
app.use('/static', express.static('./static'));
app.use('/images', express.static('./static/images'));
app.use('/lib', express.static('./lib'));

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
  console.log('Express server listening on port ' + port);
});
