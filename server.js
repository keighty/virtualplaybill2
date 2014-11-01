var express = require('express');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')({session: expressSession});
var partials = require('express-partials');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');

var User = require('./models/users_model.js');
var conn = mongoose.connect('mongodb://localhost/virtual_playbill');

var app = express();
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(cors());
app.use(bodyParser());
app.use(cookieParser());
app.use(expressSession({
  secret: 'SECRET',
  cookie: {maxAge: 60*60*1000},
  store: new mongoStore({
    db: mongoose.connection.db,
    collection: 'sessions'
  })
}));

app.use('/apps', express.static('./apps'));
app.use('/views', express.static('./views'));
app.use('/static', express.static('./static'));
app.use('/lib', express.static('./lib'));

require('./routes.js')(app);
app.listen(3030);
console.log('Express server listening on port 3030');
