var express = require('express');

//URL for the sessions collections in mongoDB
var mongoSessionConnectURL = "mongodb://localhost:27017/sensorCloud";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var endUser = require('./routes/endUser');
var bills = require('./routes/bills');
var map = require('./routes/map');

var sensors = require('./routes/sensors');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(expressSession({
    secret: 'SensorCloud',
    resave: false,  //don't save session if unmodified
    saveUninitialized: false,	// don't create session until something stored
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    store: new mongoStore({
        url: mongoSessionConnectURL
    })
}));


app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/', endUser.signupUser);
//app.get('/signup', signup.signupUser);
app.post('/registerUser',endUser.registerUser);
app.get('/loginUser', endUser.loginUser);
app.post('/loginCheckUser',endUser.loginCheckUser);
app.get('/loginSensorAdmin', sensors.loginSensorAdmin);
app.post('/loginCheckSensorAdmin', sensors.loginCheckSensorAdmin);
app.get('/userDashboard',endUser.userDashboard);
app.get('/listActiveSensors', endUser.listActiveSensors);

app.get('/sensorAdminDashboard',sensors.sensorAdminDashboard);
app.post('/addSensorData',sensors.addSensorData);
app.get('/listSensors',sensors.listSensors);

app.post('/activateSensor',sensors.activateSensor);
app.post('/deactivateSensor',sensors.deactivateSensor);
app.post('/subscribeSensor', endUser.subscribeSensor);
app.post('/unsubscribeSensor', endUser.unsubscribeSensor);
app.get('/mySensors', endUser.mySesnors);
app.get('/listToSubscribeSensors', endUser.listToSubscribeSensors);
app.get('/getCurrentData',sensors.getCurrentData);
app.get('/getForecastData', sensors.getForecastData);
app.get('/myBills', bills.myBills);
app.get('/logout',endUser.logout);
app.get('/logoutAdmin',sensors.logout);
//app.post('/deleteSensor', sensors.deleteSensor);

//app.get('/map',map.showMap);
//app.get('/analysis',users.analysis);



/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    cluster.schedulingPolicy = cluster.SCHED_RR;
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        var worker = cluster.fork();
        console.log("Online"+i);
    }

    cluster.on('exit', function(worker, code, signal) {
        console.log("worker"+worker.process.pid+" died");

});
}
else {


    mongo.connect(mongoSessionConnectURL, function () {
        console.log('Connected to mongo at: ' + mongoSessionConnectURL);
        http.createServer(app).listen(app.get('port'), function () {
            console.log('Express server listening on port ' + app.get('port'));
        });
    });
}
